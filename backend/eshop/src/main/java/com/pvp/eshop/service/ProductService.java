package com.pvp.eshop.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import com.pvp.eshop.config.Generated;
import com.pvp.eshop.model.Product;
import com.pvp.eshop.model.requests.FilterRequest;
import com.pvp.eshop.model.requests.ProductRequest;
import com.pvp.eshop.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ProductService {
    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public List<Product> filterProducts(FilterRequest request) {
        String name = request.getName();
        List<String> states = request.getState();
        String priceFromString = request.getPriceFrom();
        String priceToString = request.getPriceTo();
        String category = request.getCategory();

        Float priceFrom = findMinPrice();
        Float priceTo = findMaxPrice();
        if (priceFromString != null) {
            priceFrom = Float.parseFloat(request.getPriceFrom());
        }
        if (priceToString != null) {
            priceTo = Float.parseFloat(request.getPriceTo());
        }

        //if no state is selected, select all
        if (states == null || states.isEmpty()) {
            states.add("Neveikianti");
            states.add("Mažai naudota");
            states.add("Naudota");
            states.add("Nauja");
        }
        List<Product> filteredProducts = productRepository.filter(
            name,
            priceFrom,
            priceTo,
            states,
            category
        );

        if (request.getSortColumn() != null && request.getSortDirection() != null) {
            filteredProducts = sortProducts(filteredProducts, request.getSortColumn(), request.getSortDirection());
        }

        return filteredProducts;
    }

    public List<Product> sortProducts(List<Product> list, String column, String direction) {
        Comparator<Product> comparator = switch (column) {
            case "name" -> (p1, p2) -> p1.getName().compareTo(p2.getName());
            case "price" -> (p1, p2) -> p1.getPrice().compareTo(p2.getPrice());
            case "createdAt" -> (p1, p2) -> p1.getCreatedAt().compareTo(p2.getCreatedAt());
            default -> throw new IllegalArgumentException("Invalid column name: " + column);
        };
        if (direction.equals("DESC")) {
            comparator = comparator.reversed();
        }

        Collections.sort(list, comparator);
        return list;
    }

    public Product getProductById(long id) {
        return productRepository.findById(id).get();
    }
    public List<Product> getProductsByUserId(long id) {
        return productRepository.productsByUser(id);
    }

    public Product createProduct(ProductRequest productRequest) {
        Product newProduct = new Product();
        newProduct.setName(productRequest.getName());
        newProduct.setDescription(productRequest.getDescription());
        newProduct.setPrice(productRequest.getPrice());
        newProduct.setStatus(productRequest.getStatus());
        newProduct.setUser_id(productRequest.getUser_id());
        newProduct.setCategory(productRequest.getCategory());
        newProduct.setCity(productRequest.getCity());
        Product saved = productRepository.save(newProduct);
        saved.setImageUrl("backend/eshop/src/main/resources/assets/products/" + saved.getId());
        MultipartFile file = productRequest.getImage();
        uploadFile(saved.getImageUrl(),file);
        return productRepository.save(saved);
    }

    @Generated
    public void uploadFile(String uploadDir, MultipartFile file) {
        if (file != null && !file.isEmpty()) {
            try {
                String realPathToUploads = new File(uploadDir).getAbsolutePath();
                if (!new File(realPathToUploads).exists()) {
                    new File(realPathToUploads).mkdirs();
                }

                String orgName = file.getOriginalFilename();
                String filePath = realPathToUploads + "/" + orgName;
                File dest = new File(filePath);
                file.transferTo(dest);
            } catch (Exception e) {
                System.out.println(e);
            }
        }
    }

    public boolean existsProduct(long id) {
        return productRepository.existsById(id);
    }

    public Product updateProduct(Long id, ProductRequest product) {
        Product productFromDb = productRepository.findById(id).get();
        productFromDb.setName(product.getName());
        productFromDb.setDescription(product.getDescription());
        productFromDb.setPrice(product.getPrice());
        productFromDb.setStatus(product.getStatus());
        productFromDb.setUser_id(productFromDb.getUser_id());
        productFromDb.setCategory(product.getCategory());
        productFromDb.setCity(product.getCity());
        productFromDb.setHidden(product.isHidden());
        String imagePath = productFromDb.getImageUrl();
        if (imagePath!=null) {
            File file = new File(imagePath);
            if (file.exists()) {
                deleteRecursive(file);
            }
        }
        MultipartFile newImage = product.getImage();
        uploadFile(imagePath, newImage);
        return productRepository.save(productFromDb);
    }
    public void deleteProduct(Long id) {
        String folderPath = productRepository.findById(id).get().getImageUrl();
        if (folderPath != null) {
            File folder = new File(folderPath);
            if (folder.exists()) {
                deleteRecursive(folder);
            }
        }

        productRepository.deleteById(id);
    }

    @Generated
    private void deleteRecursive(File file) {
        if (file.isDirectory()) {
            File[] children = file.listFiles();
            if (children != null) {
                for (File child : children) {
                    deleteRecursive(child);
                }
            }
        }
        file.delete();
    }

    public Float findMaxPrice() {
        return productRepository.findMaxPrice();
    }
    public Float findMinPrice() {
        return productRepository.findMinPrice();
    }

    @Generated
    public byte[] getImageFile(String path) throws IOException {
        File folder = new File(path);
        File[] files = folder.listFiles();
        if (files != null) {
            return Files.readAllBytes(files[0].toPath());
        }
        return new byte[0];
    }

    public List<Product> getUserWishlistProducts(long id) {
        return productRepository.getUserWishlistProducts(id);
    }
}
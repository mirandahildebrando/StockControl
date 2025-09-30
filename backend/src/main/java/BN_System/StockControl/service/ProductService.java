package BN_System.StockControl.service;

import java.util.List;

import org.springframework.stereotype.Service;

import BN_System.StockControl.entity.Product;
import BN_System.StockControl.repository.ProductRepository;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    // Criar produto
    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    // Listar todos os produtos
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // Atualizar produto
    public Product updateProduct(Long id, Product productDetails) {
        return productRepository.findById(id)
                .map(product -> {
                    product.setName(productDetails.getName());
                    product.setPrice(productDetails.getPrice());
                    product.setQuantity(productDetails.getQuantity());
                    return productRepository.save(product);
                })
                .orElseThrow(() -> new RuntimeException("Product not found with id " + id));
    }

    // Deletar produto
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
}

import React, { useState, useEffect } from 'react';

function ProductComponent() {
    const [products, setProducts] = useState([]);  // Liste des produits
    const [productName, setProductName] = useState("");  // Nom du produit
    const [productDescription, setProductDescription] = useState("");  // Description du produit
    const [productPrice, setProductPrice] = useState("");  // Prix du produit
    const [loading, setLoading] = useState(false);  // Indicateur de chargement

    // Simuler un appel API pour récupérer les produits
    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        setLoading(true);
        // Simuler un appel API pour récupérer la liste des produits
        const fetchedProducts = [
            { id: 1, name: 'Product 1', description: 'Description 1', price: '50' },
            { id: 2, name: 'Product 2', description: 'Description 2', price: '100' },
        ];
        setProducts(fetchedProducts);
        setLoading(false);
    };

    const handleAddProduct = async (event) => {
        event.preventDefault();
        if (!productName || !productDescription || !productPrice || isNaN(productPrice) || productPrice <= 0) {
            alert('Please enter valid product details.');
            return;
        }

        // Ajouter un produit (simuler l'appel API)
        const newProduct = {
            id: products.length + 1,  // Générer un ID unique (ici simple incrément)
            name: productName,
            description: productDescription,
            price: productPrice,
        };

        setProducts([...products, newProduct]);
        setProductName('');
        setProductDescription('');
        setProductPrice('');
    };

    return (
        <div style={styles.container}>
            <h1>Product Management</h1>

            <div style={styles.formContainer}>
                <h3>Add New Product</h3>
                <form onSubmit={handleAddProduct} style={styles.form}>
                    <input
                        type="text"
                        placeholder="Product Name"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        style={styles.input}
                        required
                    />
                    <textarea
                        placeholder="Product Description"
                        value={productDescription}
                        onChange={(e) => setProductDescription(e.target.value)}
                        style={styles.input}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Product Price"
                        value={productPrice}
                        onChange={(e) => setProductPrice(e.target.value)}
                        style={styles.input}
                        required
                    />
                    <button type="submit" style={styles.button}>Add Product</button>
                </form>
            </div>

            {loading ? (
                <p>Loading products...</p>
            ) : (
                <div>
                    <h3>Product List</h3>
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id}>
                                    <td>{product.name}</td>
                                    <td>{product.description}</td>
                                    <td>{product.price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

// Styles pour le composant
const styles = {
    container: {
        padding: '20px',
        maxWidth: '800px',
        margin: '0 auto',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    },
    formContainer: {
        marginBottom: '30px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    input: {
        width: '100%',
        padding: '10px',
        marginBottom: '10px',
        borderRadius: '4px',
        border: '1px solid #ddd',
        fontSize: '16px',
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#28a745',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        fontSize: '16px',
        cursor: 'pointer',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px',
    },
    tableCell: {
        padding: '8px 12px',
        border: '1px solid #ddd',
    },
};

export default ProductComponent;

from app import app, db
from models import Product

def seed_products():
    """Seed the database with sample products"""
    
    sample_products = [
        {
            'name': 'EcoClean All-Purpose Cleaner',
            'brand': 'GreenHome',
            'description': 'Our revolutionary eco-friendly all-purpose cleaner is made with 100% natural ingredients and biodegradable formula. Safe for the environment and your family!',
            'category': 'Cleaning',
            'sustainability_score': 75.0
        },
        {
            'name': 'Organic Cotton T-Shirt',
            'brand': 'EarthWear',
            'description': 'Made from certified organic cotton grown without harmful pesticides. Our sustainable manufacturing process reduces water usage by 50%.',
            'category': 'Clothing',
            'sustainability_score': 85.0
        },
        {
            'name': 'Bamboo Toothbrush Set',
            'brand': 'NaturalSmile',
            'description': 'Eco-friendly bamboo toothbrushes with biodegradable bristles. Plastic-free packaging made from recycled materials.',
            'category': 'Personal Care',
            'sustainability_score': 90.0
        },
        {
            'name': 'Green Energy Drink',
            'brand': 'NaturalBoost',
            'description': 'All-natural energy drink with green tea extract and natural flavors. Eco-friendly packaging and sustainable sourcing.',
            'category': 'Beverages',
            'sustainability_score': 60.0
        },
        {
            'name': 'Recycled Paper Notebooks',
            'brand': 'EcoOffice',
            'description': 'Made from 100% recycled paper with soy-based inks. Carbon-neutral shipping and sustainable forest management.',
            'category': 'Office Supplies',
            'sustainability_score': 80.0
        },
        {
            'name': 'Natural Shampoo',
            'brand': 'PureHair',
            'description': 'Chemical-free shampoo with organic ingredients. Paraben-free, sulfate-free, and cruelty-free formula in recyclable bottles.',
            'category': 'Personal Care',
            'sustainability_score': 70.0
        }
    ]
    
    with app.app_context():
        # Clear existing products
        Product.query.delete()
        
        # Add sample products
        for product_data in sample_products:
            product = Product(**product_data)
            db.session.add(product)
        
        db.session.commit()
        print(f"Seeded {len(sample_products)} products successfully!")

if __name__ == '__main__':
    seed_products()
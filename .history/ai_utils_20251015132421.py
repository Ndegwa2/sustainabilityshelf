import openai
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Debug: Check library versions before client initialization
print(f"OpenAI version: {openai.__version__}")
try:
    import httpx
    print(f"httpx version: {httpx.__version__}")
except ImportError:
    print("httpx not found")

# Initialize OpenAI client
client = openai.OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

def detect_greenwashing(description):
    """
    Analyze a product description for signs of greenwashing
    """
    prompt = f"""
    Analyze the product description below. Does it show signs of greenwashing? If yes, list them.
    Be specific and focus on identifying vague terms, lack of verifiable claims, and other red flags.
    
    Description: {description}
    """
    
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are an expert in identifying greenwashing in product descriptions. Greenwashing involves misleading claims about the environmental benefits of a product."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=300,
            temperature=0.3
        )
        
        return response.choices[0].message.content.strip()
    except Exception as e:
        return f"Error analyzing description: {str(e)}"

def suggest_sustainable_alternatives(category, current_product_name):
    """
    Suggest more sustainable alternatives for a product category
    """
    prompt = f"""
    Suggest 3 more sustainable alternatives to "{current_product_name}" in the "{category}" category.
    For each alternative, provide:
    1. Product name
    2. Brand
    3. Key sustainable features
    4. A brief explanation of why it's more sustainable
    
    Format your response as a JSON array of objects.
    """
    
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are an expert in sustainable products and alternatives. Provide specific, realistic product suggestions with brands."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=500,
            temperature=0.5
        )
        
        return response.choices[0].message.content.strip()
    except Exception as e:
        return f"Error suggesting alternatives: {str(e)}"

def calculate_sustainability_score(description, greenwashing_analysis):
    """
    Calculate a sustainability score based on the product description and greenwashing analysis
    """
    prompt = f"""
    Based on the product description and greenwashing analysis, calculate a sustainability score from 0-100.
    
    Product Description: {description}
    
    Greenwashing Analysis: {greenwashing_analysis}
    
    Return only the numeric score.
    """
    
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are an expert in evaluating the sustainability of products. Return only a numeric score between 0 and 100."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=10,
            temperature=0.3
        )
        
        # Extract numeric score from response
        score_text = response.choices[0].message.content.strip()
        try:
            score = float(score_text)
            return max(0, min(100, score))  # Ensure score is between 0 and 100
        except ValueError:
            return 0  # Default score if parsing fails
    except Exception as e:
        return 0  # Default score if API call fails
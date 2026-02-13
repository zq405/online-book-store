<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BookVerse - Your Ultimate E-Book Store</title>
    <style>
        /* Reset and General Styles */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f8fbff;
        }

        /* External CSS can be added here - using internal for now */
        
        /* Navigation Bar */
        nav {
            background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
            padding: 1rem 2rem;
            position: sticky;
            top: 0;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            z-index: 100;
        }

        .nav-container {
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
        }

        .logo {
            font-size: 1.8rem;
            font-weight: bold;
            color: #0d47a1;
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .logo:hover {
            color: #1565c0;
        }

        .nav-links {
            display: flex;
            list-style: none;
            gap: 2rem;
            align-items: center;
        }

        .nav-links a {
            text-decoration: none;
            color: #0d47a1;
            font-weight: 500;
            transition: color 0.3s ease;
            padding: 0.5rem 1rem;
            border-radius: 5px;
        }

        .nav-links a:hover {
            background-color: rgba(13, 71, 161, 0.1);
            color: #1565c0;
        }

        .nav-buttons {
            display: flex;
            gap: 1rem;
        }

        .btn-login, .btn-signup {
            padding: 0.6rem 1.2rem;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s ease;
            text-decoration: none;
            display: inline-block;
        }

        .btn-login {
            background-color: white;
            color: #0d47a1;
            border: 2px solid #0d47a1;
        }

        .btn-login:hover {
            background-color: #0d47a1;
            color: white;
        }

        .btn-signup {
            background-color: #0d47a1;
            color: white;
        }

        .btn-signup:hover {
            background-color: #1565c0;
            transform: translateY(-2px);
        }

        /* Hero Section */
        .hero {
            background: linear-gradient(135deg, #81d4fa 0%, #4fc3f7 50%, #29b6f6 100%);
            color: white;
            padding: 4rem 2rem;
            text-align: center;
            min-height: 400px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }

        .hero h1 {
            font-size: 3rem;
            margin-bottom: 1rem;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
        }

        .hero p {
            font-size: 1.3rem;
            margin-bottom: 2rem;
            max-width: 600px;
        }

        .search-bar {
            display: flex;
            gap: 0.5rem;
            justify-content: center;
            margin-bottom: 2rem;
            flex-wrap: wrap;
        }

        .search-input {
            padding: 1rem;
            border: none;
            border-radius: 5px;
            width: 100%;
            max-width: 400px;
            font-size: 1rem;
        }

        .search-btn {
            padding: 1rem 2rem;
            background-color: #0d47a1;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-weight: 600;
            transition: background-color 0.3s ease;
        }

        .search-btn:hover {
            background-color: #1565c0;
        }

        /* Categories Section */
        .categories {
            max-width: 1200px;
            margin: 3rem auto;
            padding: 0 2rem;
        }

        .section-title {
            font-size: 2rem;
            color: #0d47a1;
            margin-bottom: 2rem;
            text-align: center;
            font-weight: bold;
        }

        .category-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1.5rem;
        }

        .category-card {
            background: linear-gradient(135deg, #e1f5fe 0%, #b3e5fc 100%);
            padding: 2rem;
            border-radius: 10px;
            text-align: center;
            cursor: pointer;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            border: 2px solid #80deea;
        }

        .category-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 10px 20px rgba(13, 71, 161, 0.2);
            background: linear-gradient(135deg, #b3e5fc 0%, #80deea 100%);
        }

        .category-icon {
            font-size: 3rem;
            margin-bottom: 1rem;
        }

        .category-card h3 {
            color: #0d47a1;
            font-size: 1.3rem;
            margin-bottom: 0.5rem;
        }

        .category-card p {
            color: #555;
            font-size: 0.95rem;
        }

        /* Featured Books Section */
        .featured-books {
            max-width: 1200px;
            margin: 3rem auto;
            padding: 0 2rem;
        }

        .books-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 2rem;
        }

        .book-card {
            background: white;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 4px 15px rgba(13, 71, 161, 0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .book-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 8px 25px rgba(13, 71, 161, 0.2);
        }

        .book-cover {
            width: 100%;
            height: 280px;
            background: linear-gradient(135deg, #81d4fa 0%, #29b6f6 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 1rem;
            text-align: center;
            padding: 1rem;
            font-weight: bold;
        }

        .book-info {
            padding: 1.5rem;
        }

        .book-title {
            font-size: 1.1rem;
            font-weight: bold;
            color: #0d47a1;
            margin-bottom: 0.5rem;
        }

        .book-author {
            color: #666;
            font-size: 0.95rem;
            margin-bottom: 0.5rem;
            font-style: italic;
        }

        .book-rating {
            color: #ffc107;
            font-size: 0.9rem;
            margin-bottom: 1rem;
        }

        .book-price {
            font-size: 1.3rem;
            font-weight: bold;
            color: #0d47a1;
            margin-bottom: 1rem;
        }

        .btn-view-details {
            width: 100%;
            padding: 0.8rem;
            background-color: #0d47a1;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-weight: 600;
            transition: background-color 0.3s ease;
        }

        .btn-view-details:hover {
            background-color: #1565c0;
        }

        /* About Section */
        .about {
            background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
            padding: 3rem 2rem;
            margin: 3rem 0;
        }

        .about-container {
            max-width: 1200px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 3rem;
            align-items: center;
        }

        .about-text h2 {
            font-size: 2rem;
            color: #0d47a1;
            margin-bottom: 1rem;
        }

        .about-text p {
            color: #555;
            margin-bottom: 1rem;
            text-align: justify;
        }

        .about-image {
            width: 100%;
            height: 300px;
            background: linear-gradient(135deg, #81d4fa 0%, #4fc3f7 100%);
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 1.2rem;
            text-align: center;
        }

        /* Features Section */
        .features {
            max-width: 1200px;
            margin: 3rem auto;
            padding: 0 2rem;
        }

        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
        }

        .feature-box {
            text-align: center;
            padding: 2rem;
            background: white;
            border-radius: 10px;
            border-top: 4px solid #0d47a1;
            box-shadow: 0 4px 10px rgba(13, 71, 161, 0.1);
        }

        .feature-icon {
            font-size: 2.5rem;
            margin-bottom: 1rem;
        }

        .feature-box h3 {
            color: #0d47a1;
            margin-bottom: 0.5rem;
        }

        .feature-box p {
            color: #666;
            font-size: 0.95rem;
        }

        /* Newsletter Section */
        .newsletter {
            background: linear-gradient(135deg, #81d4fa 0%, #29b6f6 100%);
            color: white;
            padding: 3rem 2rem;
            text-align: center;
        }

        .newsletter-container {
            max-width: 600px;
            margin: 0 auto;
        }

        .newsletter h2 {
            font-size: 2rem;
            margin-bottom: 1rem;
        }

        .newsletter p {
            font-size: 1.1rem;
            margin-bottom: 1.5rem;
        }

        .newsletter-form {
            display: flex;
            gap: 0.5rem;
            flex-wrap: wrap;
        }

        .newsletter-input {
            flex: 1;
            padding: 1rem;
            border: none;
            border-radius: 5px;
            min-width: 200px;
            font-size: 1rem;
        }

        .newsletter-btn {
            padding: 1rem 2rem;
            background-color: #0d47a1;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-weight: 600;
            transition: background-color 0.3s ease;
        }

        .newsletter-btn:hover {
            background-color: #1565c0;
        }

        /* Footer */
        footer {
            background-color: #0d47a1;
            color: white;
            padding: 2rem;
            margin-top: 3rem;
        }

        .footer-container {
            max-width: 1200px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
        }

        .footer-section h4 {
            margin-bottom: 1rem;
            font-size: 1.1rem;
        }

        .footer-section ul {
            list-style: none;
        }

        .footer-section ul li {
            margin-bottom: 0.5rem;
        }

        .footer-section a {
            color: #b3e5fc;
            text-decoration: none;
            transition: color 0.3s ease;
        }

        .footer-section a:hover {
            color: white;
        }

        .footer-bottom {
            text-align: center;
            margin-top: 2rem;
            padding-top: 2rem;
            border-top: 1px solid #1565c0;
            color: #b3e5fc;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
            .hero h1 {
                font-size: 2rem;
            }

            .hero p {
                font-size: 1rem;
            }

            .nav-links {
                gap: 1rem;
                width: 100%;
                justify-content: center;
                margin-top: 1rem;
            }

            .about-container {
                grid-template-columns: 1fr;
            }

            .section-title {
                font-size: 1.5rem;
            }
        }
    </style>
</head>
<body>
    <!-- Navigation -->
    <nav>
        <div class="nav-container">
            <a href="index.html" class="logo">📚 BookVerse</a>
            <ul class="nav-links">
                <li><a href="#home">Home</a></li>
                <li><a href="#categories">Categories</a></li>
                <li><a href="#featured">Featured Books</a></li>
                <li><a href="#about">About Us</a></li>
                <li><a href="contact.html">Contact</a></li>
            </ul>
            <div class="nav-buttons">
                <a href="login.html" class="btn-login">Login</a>
                <a href="register.html" class="btn-signup">Sign Up</a>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section class="hero" id="home">
        <h1>Welcome to BookVerse</h1>
        <p>Discover Millions of E-Books at Your Fingertips</p>
        <div class="search-bar">
            <input type="text" class="search-input" placeholder="Search by title, author, or genre...">
            <button class="search-btn">Search</button>
        </div>
    </section>

    <!-- Categories Section -->
    <section class="categories" id="categories">
        <h2 class="section-title">Browse Categories</h2>
        <div class="category-grid">
            <div class="category-card">
                <div class="category-icon">📖</div>
                <h3>Fiction</h3>
                <p>Novels, Fantasy & Romance</p>
            </div>
            <div class="category-card">
                <div class="category-icon">🎓</div>
                <h3>Educational</h3>
                <p>Textbooks & Learning Materials</p>
            </div>
            <div class="category-card">
                <div class="category-icon">🔬</div>
                <h3>Science & Tech</h3>
                <p>Technology & Science Books</p>
            </div>
            <div class="category-card">
                <div class="category-icon">💼</div>
                <h3>Business</h3>
                <p>Entrepreneurship & Self-Help</p>
            </div>
            <div class="category-card">
                <div class="category-icon">🎨</div>
                <h3>Arts & Culture</h3>
                <p>Art, Design & History</p>
            </div>
            <div class="category-card">
                <div class="category-icon">🌍</div>
                <h3>Travel</h3>
                <p>Travel Guides & Adventures</p>
            </div>
        </div>
    </section>

    <!-- Featured Books Section -->
    <section class="featured-books" id="featured">
        <h2 class="section-title">Featured Books</h2>
        <div class="books-grid">
            <div class="book-card">
                <div class="book-cover">The Digital Revolution</div>
                <div class="book-info">
                    <div class="book-title">The Digital Revolution</div>
                    <div class="book-author">by John Smith</div>
                    <div class="book-rating">⭐⭐⭐⭐⭐ (248 reviews)</div>
                    <div class="book-price">$9.99</div>
                    <button class="btn-view-details">View Details</button>
                </div>
            </div>

            <div class="book-card">
                <div class="book-cover">Beyond the Horizon</div>
                <div class="book-info">
                    <div class="book-title">Beyond the Horizon</div>
                    <div class="book-author">by Emily Davis</div>
                    <div class="book-rating">⭐⭐⭐⭐ (156 reviews)</div>
                    <div class="book-price">$12.99</div>
                    <button class="btn-view-details">View Details</button>
                </div>
            </div>

            <div class="book-card">
                <div class="book-cover">Code Masters</div>
                <div class="book-info">
                    <div class="book-title">Code Masters</div>
                    <div class="book-author">by Alex Johnson</div>
                    <div class="book-rating">⭐⭐⭐⭐⭐ (312 reviews)</div>
                    <div class="book-price">$14.99</div>
                    <button class="btn-view-details">View Details</button>
                </div>
            </div>

            <div class="book-card">
                <div class="book-cover">Mindful Living</div>
                <div class="book-info">
                    <div class="book-title">Mindful Living</div>
                    <div class="book-author">by Sarah Wilson</div>
                    <div class="book-rating">⭐⭐⭐⭐ (189 reviews)</div>
                    <div class="book-price">$11.99</div>
                    <button class="btn-view-details">View Details</button>
                </div>
            </div>

            <div class="book-card">
                <div class="book-cover">Ocean Mysteries</div>
                <div class="book-info">
                    <div class="book-title">Ocean Mysteries</div>
                    <div class="book-author">by Michael Brown</div>
                    <div class="book-rating">⭐⭐⭐⭐⭐ (267 reviews)</div>
                    <div class="book-price">$13.99</div>
                    <button class="btn-view-details">View Details</button>
                </div>
            </div>

            <div class="book-card">
                <div class="book-cover">Startup Stories</div>
                <div class="book-info">
                    <div class="book-title">Startup Stories</div>
                    <div class="book-author">by Lisa Anderson</div>
                    <div class="book-rating">⭐⭐⭐⭐ (142 reviews)</div>
                    <div class="book-price">$10.99</div>
                    <button class="btn-view-details">View Details</button>
                </div>
            </div>
        </div>
    </section>

    <!-- About Section -->
    <section class="about" id="about">
        <div class="about-container">
            <div class="about-text">
                <h2>About BookVerse</h2>
                <p>BookVerse is a leading online e-book store dedicated to providing readers worldwide with access to millions of titles across all genres. We believe in making literature accessible, affordable, and convenient for everyone.</p>
                <p>Our mission is to foster a love of reading and connect readers with their favorite authors. With our extensive collection and user-friendly platform, discovering your next great read has never been easier.</p>
                <p>Join our community of millions of readers today and start your literary journey with BookVerse!</p>
            </div>
            <div class="about-image">📱 E-Book Store Platform</div>
        </div>
    </section>

    <!-- Features Section -->
    <section class="features">
        <h2 class="section-title">Why Choose BookVerse?</h2>
        <div class="features-grid">
            <div class="feature-box">
                <div class="feature-icon">💎</div>
                <h3>Vast Collection</h3>
                <p>Access millions of e-books across all genres and categories</p>
            </div>
            <div class="feature-box">
                <div class="feature-icon">⚡</div>
                <h3>Instant Access</h3>
                <p>Download your e-books instantly after purchase</p>
            </div>
            <div class="feature-box">
                <div class="feature-icon">💰</div>
                <h3>Affordable Prices</h3>
                <p>Enjoy competitive pricing and frequent discounts</p>
            </div>
            <div class="feature-box">
                <div class="feature-icon">🔒</div>
                <h3>Secure Payment</h3>
                <p>Safe and secure payment options for your peace of mind</p>
            </div>
            <div class="feature-box">
                <div class="feature-icon">🌟</div>
                <h3>Customer Reviews</h3>
                <p>Read authentic reviews from verified readers</p>
            </div>
            <div class="feature-box">
                <div class="feature-icon">📞</div>
                <h3>24/7 Support</h3>
                <p>Get help whenever you need it from our support team</p>
            </div>
        </div>
    </section>

    <!-- Newsletter Section -->
    <section class="newsletter">
        <div class="newsletter-container">
            <h2>Subscribe to Our Newsletter</h2>
            <p>Get updates on new releases, bestsellers, and exclusive offers</p>
            <form class="newsletter-form">
                <input type="email" class="newsletter-input" placeholder="Enter your email..." required>
                <button type="submit" class="newsletter-btn">Subscribe</button>
            </form>
        </div>
    </section>

    <!-- Footer -->
    <footer>
        <div class="footer-container">
            <div class="footer-section">
                <h4>About Us</h4>
                <ul>
                    <li><a href="aboutUs.html">About BookVerse</a></li>
                    <li><a href="#">Our Mission</a></li>
                    <li><a href="#">Careers</a></li>
                    <li><a href="#">Blog</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h4>Customer Service</h4>
                <ul>
                    <li><a href="contactUs.html">Contact Us</a></li>
                    <li><a href="#">FAQ</a></li>
                    <li><a href="#">Shipping Info</a></li>
                    <li><a href="#">Returns</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h4>Legal</h4>
                <ul>
                    <li><a href="#">Privacy Policy</a></li>
                    <li><a href="#">Terms of Service</a></li>
                    <li><a href="#">Cookie Policy</a></li>
                    <li><a href="#">Copyright Notice</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h4>Follow Us</h4>
                <ul>
                    <li><a href="#">📘 Facebook</a></li>
                    <li><a href="#">🐦 Twitter</a></li>
                    <li><a href="#">📷 Instagram</a></li>
                    <li><a href="#">💼 LinkedIn</a></li>
                </ul>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2025 BookVerse. All rights reserved. | Designed with ❤️ for book lovers everywhere</p>
        </div>
    </footer>
</body>
</html>

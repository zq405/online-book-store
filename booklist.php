<?
session_start();
include 'connect.php';

$category=isset($_GET['category'])?$_GET['category']:'';
$search=isset($_GET['search'])?$_GET['search']:'';
$sort=isset($_GET['sort'])?$_GET['sort']:'';

$sql="SELECT * FROM books WHERE 1=1";
if(!empty($category))
{
    $sql.="AND category='$category'";
}

if(!empty($search))
{
    $sql.="AND (tittle LIKE '%$search%'OR author LIKE '%$search%')";
}

if($sort=='price_low')
{
    $sql.="ORDER BY price ASC";
}
else if($sortr=='price_high')
{
    $dql.="ORDER BY price DESC";
}
else if($sort=='tittle')
{
    $sql.="ORDER BY tittle ASC";
}
else if($sort=='author')
{
    $sql.="ORDER BY author ASC";
}
else
{
    $sql.="ORDER BY tittle ASC";
}

$result=mysqli_query($conn,$sql);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Book List - BookVerse</title>
    <link rel="stylesheet" href="style.css">
    <style>
        .filter
        {
            max-width:1200px;
            margin:2rem auto;
            padding:0 2rem;
            background:white;
            border-radius:10px;
            box-shadow:0 4px 15px rgba(13,71,161,0.1);
            padding:1.5rem;
        }

        .filter-row
        {
            display:flex;
            gap:2rem;
            flex-wrap:wrap;
            margin-bottom:1rem;
        }

        .filter-group
        {
            flex:1;
            min-width:200px:
        }

        .filter-group label
        {
            display:block;
            margin-bottom:0.5rem;
            font-weight:600;
            color:#0d47a1;
        }

        .filter-group select, .filter-group input
        {
            width:100%;
            padding:1px solid #bbdefb;
            border-radius:5px;
            font-size:1rem;
        }

        .apply-filters
        {
            background-color:#0d47a1;
            color:white;
            border:none;
            padding: 0.8rem 2rem;
            border-radius:5px;
            cursor:pointer;
            font-weight:600;
        }

        .books-header
        {
            max-width:1200px;
            margin:2rem auto;
            padding:0 2rem;
            display:flex;
            justify-content:space-between;
            align-items:center;
        }

        .results-count
        {
            color:#666;
        }

        .sort-options select
        {
            padding:0.5rem;
            border:1px solid #bbdefb;
            border-radius:5px;
        }

        .pagination
        {
            display:flex;
            justify-content:center;
            gap:0.5rem;
            max-width:1200px;
            padding:0 2rem;
        }

        .page-btn
        {
            padding:0.5rem 1rem;
            border:1px solid #bbdefb;
            background:white;
            border-radius:5px;
            cursor:pointer;
            transition:all 0.3s;
        }

        .page-btn.active
        {
            background-color:#0d47a1;
            color:white;
            border-color:#e3f2fd;
        }
    </style>
</head>
<body>
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
    <section class="filters">
        <form method="GET" action="booklist.php">
            <div class="filter-row">
                <div class="filter-group">
                    <label for="category">Category</label>
                    <select id="category" name="category">
                        <option value="">All category</option>
                        <option value="Fiction"<?php echo $category=='Fiction'?'selected':'';?>>Fiction</option>
                        <option value="Education"<?php echo $category=='Education'?'selected':''?>>Education</option>
                        <option value="Science"<?php echo $category=='Science'?'selected':''?>>Science</option>
                        <option value="Business"<?php echo $category=='Business'?'selected':''?>>Business</option>
                        <option value="Art"<?php echo $category=='Art'?'selected':''?>>Art</option>
                        <option value="Travel"<?php echo $category=='Travel'?'selected':''?>>Travel</option>
                    </select>
                </div>
                <div class="filter-group">
                    <label for="search">Search</label>
                    <input type="text" id="search" name="search" placeholder="Search by tittle or author" value="<?php echo htmlspecialchars($search);?>">
                </div>
                <div class="filter-group">
                    <label for="sort">Sort By</label>
                    <select id="sort" name="sort">
                        <option value="tittle"<?php echo $sort=='tittle'?'selected':'';?>>Tittle A-Z</option>
                        <option value="author"<?php echo $sortr=='author'?'selected':'';?>>Author</option>
                        <option value="price_low"<?php echo $sort=='price_low'?'selected':''?>>Price : Low to High</option>
                        

    
</body>
</html>
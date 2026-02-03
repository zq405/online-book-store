function Login()
{
    alert("Login successful!");
    window.location.href()="dashboard.html";
}

function addToCart(book)
{
    alert(book + " added to cart!");
}

function paynow()
{
    alert("Payment Successful!");
}

function submitComment()
{
    alert("Thank you for your feedback!");
}

function getCategoryFromURL()
{
    const params= new URLSearchParams(window.location.search);
    return params.get("category");
}

function loadBooks()
{
    const category=getCategoryFromURL();
    const bookList =document.getElementById("booklist");
    const tittle= document.getElementById("categoryTittle");

    let filteredBooks = book;
}
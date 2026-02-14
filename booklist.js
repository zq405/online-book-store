const booksData=
        [
            {
                id:1, 
                tittle:"Atlas of AI: Power, Politics, and the Planetary Costs of Artificial Intelligence", 
                author:"Kate Crawford", 
                description:"The hidden costs of artificial intelligence, from natural resources and labor to privacy, equality, and freedom.",
                price:9.90,
                originalPrice:14.99, 
                rating:4.8, 
                reviewCount:248,
                page:288,
                publishDate:"2020-07-28",
                isBestseller:true,
                isNew:false,
                category:"technology",
                tags:["Technology","Business"]
            },
            {
                id:2, 
                tittle:"Building a StoryBrand: Clarify Your Message So Customers Will Listen", 
                author:"Donald Miller",
                description:"A revolutionary marketing and communication guide designed to solve the core problem businesses face: their message is too confusing, so customers don't listen.", 
                price:12.99,
                originalPrice:null, 
                rating:4.5, 
                reviewCount:165,
                category:"business", 
                page:240,
                publishDate:"2017-10-10",
                isBestseller:true,
                isNew:false,
                tags:["Business"],
                isbn:9780718033323
            },
            {
                id:3, 
                tittle:"To Sell Is Human: The Surprising Truth About Moving Others", 
                author:"Daniel H. Pink",
                description:"In To Sell Is Human, bestselling author Daniel H.Pink challenges the traditional, often negative, stereotype of selling as a pushy, manipulative act reserved for people in slaes roles.", 
                price:14.99,
                originalPrice:19.99, 
                rating:4.9, 
                reviewCount:312,
                category:"business",
                page:36,
                publishDate:"2013-01-11",
                isBestseller:true,
                isNew:false,
                tags:["Business"],
                isbn:9781623150839
            },
            {
                id:4, 
                tittle:"Making, Breaking Codes: Introduction to Cryptology", 
                author:"Paul Garrett",
                description:"A comprehensive and engaging introductory textbook that demystifies the fascinating world of secret communication.", 
                price:11.99, 
                originalPrice:null,
                rating:4.3, 
                reviewCount:189,
                category:"technology",
                page:544,
                publishDate:"2001-08-09",
                isBestseller:true,
                isNew:false, 
                tags:["Technology","Education"],
                isbn:9780130303691,
            },
            {
                id:5, 
                tittle:"Educated", 
                author:"Tara Westover", 
                description:"A powerful, critically acclaimed memoir that chronicles and extraordinary journey from an isolated, survivalist childhood in the mountains of Idaho to the halls of Cambridge University.",
                price:13.99, 
                originalPrice:17.99,
                rating:4.7, 
                reviewCount:267,
                category:"educational",
                page:352,
                publishDate:"2018-02-20",
                isBestseller:true,
                isNew:false,
                tags:["Education"],
                isbn:9780399590504  
            },
            {
                id:6, 
                tittle:"How Children Succeed: Grit, Curiosity, and the Hidden Power of Character", 
                author:"Paul Tough", 
                description:"How Children Succeed challenges the conventional wisdom that a child's success is primarily determined by cognitive intelligence (IQ) and acdemic skills measured by standardlized tests.",
                price:10.99, 
                originalPrice:null,
                rating:4.2, 
                reviewCount:142,
                category:"educational",
                page:231,
                publishDate:"2012-09-04",
                isBestseller:false,
                isNew:false,
                tags:["Education"],
                isbn:9780547564654
            },
            {
                id:7, 
                tittle:"Lessons in Chemistry", 
                author:"Bonnie Garmus", 
                description:"A witty, uplifting and fiercely intelligent debut novel set in early 1960s America.",
                price:15.99, 
                originalPrice:24.99,
                rating:4.8, 
                reviewCount:321,
                category:"fiction",
                page:390,
                publishDate:"2023-03-02",
                isBestseller:true,
                isNew:false, 
                tags:["Fiction"],
                isbn:9781804990926
            },
            {
                id:8, 
                tittle:"To Kill a Mockingbird", 
                author:"Harper Lee",
                description:"A landmark American novel published in 1960.", 
                price:18.99,
                originalPrice:null, 
                rating:4.9, 
                reviewCount:98,
                category:"fiction",
                page:323,
                publishDate:"2021-02-01",
                isBestseller:false,
                isNew:false,
                tags:["Fiction"],
                isbn:9780060935467
            },
            {
                id:9, 
                tittle:"Tomorrow, and Tomorrow, and Tomorrow", 
                author:"Gabrielle Zevin",
                description:"A sweeping, immersive novel about friendship, love, work and the worlds we build-both real and virtual.", 
                price:19.99,
                originalPrice:null, 
                rating:4.9, 
                reviewCount:108,
                category:"fiction",
                page:399,
                publishDate:"2022-07-05",
                isBestseller:false,
                isNew:false,
                tags:["Fiction"],
                isbn:9780735243347
            },
            {
                id:10, 
                tittle:"Make It Stick: The Science of Successful Learning", 
                author:"Peter C. Brown, Henry L. Roediger III, Mark A. McDaniel", 
                description:"A groundbreaking book that translated decades of cognitive science research into actionable strategies for more effective and durable learning.",
                price:17.99, 
                originalPrice:null,
                rating:4.2, 
                reviewCount:150,
                category:"educational",
                page:313,
                publishDate:"2014-04-14",
                isBestseller:false,
                isNew:false,
                tags:["Education"],
                isbn:9780674729018
            },
            {
                id:11, 
                tittle:"The Technological Republic: Hard Power, Soft Belief, and the Future of the West", 
                author:"Alexander C. Karp, Nicholas W.Zamiska",
                description:"A provocativer and timely work of political analysis that diagnoses a critical vulnerability in Western liberal democracies.", 
                price:16.99, 
                originalPrice:null,
                rating:4.3, 
                reviewCount:200,
                category:"technology",
                page:320,
                publishDate:"2025-02-18",
                isBestseller:false,
                isNew:true, 
                tags:["Technology"],
                isbn:9780593798690,
            },
            {
                id:12, 
                tittle:"The 4-Hour Workweek", 
                author:"Timothy Ferriss",
                description:"A provocative and influential lifestyle design bible that challenges the traditional 'deferred-life plan' of working for decades to reitre.", 
                price:21.99,
                originalPrice:null, 
                rating:4.5, 
                reviewCount:210,
                category:"business", 
                page:308,
                publishDate:"2007-04-24",
                isBestseller:true,
                isNew:false,
                tags:["Business"],
                isbn:9780307353139
            }
        ];

        let shoppingCart=JSON.parse(localStorage.getItem('bookverse_cart'))||[];

        let currentView='grid';
        let currentPage=1;
        const booksPerPage=8;
        let filteredBooks =[...booksData];

        document.addEventListener('DOMContentLoaded',function(){
            const priceRange=document.getElementById('price-range');
            const priceDisplay=document.getElementById('price-display');

            priceRange.addEventListener('input',function(){
                priceDisplay.textContent =`Up to $${this.value}`;
            });

            applyFilters();

            updateCartCount();
        });

        function switchView(view)
        {
            currentView=view;

            document.querySelectorAll('.view-btn').forEach(btn=>{
                btn.classList.toggle('active',btn.dataset.view===view);
            });

            document.getElementById('grid-view').style.display=view==='grid'?'grid':'none';
            document.getElementById('list-view').style.display=view==='list'?'flex':'none';

            renderBooks();
        }

        function applyFilters()
        {
            const category=document.getElementById('category').value;
            const author=document.getElementById('author').value.toLowerCase();
            const minRating=parseFloat(document.getElementById('rating').value);
            const maxPrice=parseInt(document.getElementById('price-range').value);
            const sortBy=document.getElementById('sort-by').value;

            filteredBooks=booksData.filter(book=>{
                if (category && book.category!==category)return false;
                if(author && !book.author.toLowerCase().includes(author)) return false;
                if(minRating>0 && book.rating<minRating) return false;
                if(maxPrice<150 && book.price>maxPrice) return false;
                
                return true;
            });

            sortBooks(sortBy);

            currentPage=1;
            renderBooks();
            renderPagination();

            document.getElementById('results-count').textContent=Math.min(booksPerPage,filteredBooks.length);
            document.getElementById('total-results').textContent=filteredBooks.length;
        }

        function sortBooks(sortBy)
        {
            switch(sortBy)
            {
                case 'newest':
                    filteredBooks.sort((a,b)=>new Date(b.publishDate)- new Date(a.publishDate));
                    break;
                case 'popular':
                    filteredBooks.sort((a,b)=>b.reviewCount-a.reviewCount);
                    break;
                case 'rating':
                    filteredBooks.sort((a,b)=>b.rating-a.rating);
                    break;
                case 'price-asc':
                    filteredBooks.sort((a,b)=>a.price-b.price);
                    break;
                case 'price-desc':
                    filteredBooks.sort((a,b)=>b.price-a.price);
                    break;
                default:
                    filteredBooks.sort((a,b)=>b.rating*b.reviewCount-a.rating*a.reviewCount);
            }
        }

        function clearFilters()
        {
            document.getElementById('category').value="";
            document.getElementById('author').value="";
            document.getElementById('rating').value='0';
            document.getElementById('price-range').value='40';
            document.getElementById('price-display').textContent='Up to $40';
            document.getElementById('sort-by').value='relevance';

            applyFilters();
        }

        function renderBooks()
        {
            const startIndex=(currentPage-1)*booksPerPage;
            const endIndex=startIndex+booksPerPage;
            const booksToShow=filteredBooks.slice(startIndex,endIndex);

            if(booksToShow.length===0)
            {
                showNoResults();
                return;
            }

            if(currentView==='grid')
            {
                renderGridView(booksToShow);
            }
            else
            {
                renderListView(booksToShow);
            }
        }

        function renderGridView(books)
        {
            const gridView=document.getElementById('grid-view');
            gridView.innerHTML='';

            books.forEach(book=>{
                const isInCart=shoppingCart.some(item=>item.id===book.id);
                const bookCard=document.createElement('div');
                bookCard.className='book-card';
                if(book.isBestseller)bookCard.classList.add('bestseller');
                if(book.isNew)bookCard.classList.add('new');

                const discount=book.originalPrice?
                    Math.round((1-book.price/book.originalPrice)*100):0;
                bookCard.innerHTML=`
                <div class="book-cover">
                    <span class="category-tag">${book.tags[0]}</span>
                    <div class="tittle-preview">${book.tittle}</div>
                    <div class="author-preview">by ${book.author}</div>
                </div>
                <div class="book-info">
                    <h3 class="book-tittle">${book.tittle}</h3>
                    <div class="book-author">
                        <i class="fas fa-user-pen"></i>
                        ${book.author}
                    </div>
                    <p class="book-description">${book.description}</p>
                    <div class="book-meta">
                        <div class="book-rating">
                            ${generateStars(book.rating)}
                            <span class="count">(${book.reviewCount})</span>
                        </div>
                        <span class="book-category">${book.category}</span>
                    </div>
                    <div class="book-price">
                        $${book.price.toFixed(2)}
                        ${book.originalPrice ?
                            `<span class="orginal-price">$${book.originalPrice.toFixed(2)}</span>`:''}
                        ${discount>0?`<span class="discount">-${discount}%</span>`:''}
                    </div>
                    <div class="book-actions">
                        <button class="btn-view-details" onclick="viewBook(${book.id})">
                            <i class="fas fa-eye"></i>
                            View Details
                        </button>
                        <button class="btn-add-to-cart ${isInCart ? 'added' :''}"
                            onclick="addToCart(${book.id})"
                            ${isInCart ? 'disabled':''}>
                            <i class="fas ${isInCart ? 'fa-check':'fa-cart-plus'}"></i>
                            ${isInCart ? 'Added' : 'Add to Cart'}
                        </button>
                    </div>
                </div>
                `;
                gridView.appendChild(bookCard);
            });
        }

        function renderListView(books)
        {
            const listView=document.getElementById('list-view');
            listView.innerHTML='';
            books.forEach(book=>{
                const isInCart=shoppingCart.some(item=>item.id===book.id);
                const discount=book.originalPrice ? 
                    Math.round((1-book.price/book.originalPrice)*100):0;
                const bookItem=document.createElement('div');
                bookItem.className='book-item';
                bookItem.innerHTML=`
                <div class="book-cover">
                    <span class="category-tag">${book.tags[0]}</span>
                    <div class="tittle-preview">${book.tittle}</div>
                    <div class="author-preview">by ${book.author}</div>
                </div>
                <div class="book-details">
                    <h3 class="book-tittle">${book.tittle}</h3>
                    <div class="book-author">
                        <i class="fas fa-user-pen"></i>
                        ${book.author}
                    </div>
                    <p class="book-description">${book.description}</p>
                    <div class="book-meta">
                        <div class="book-rating">
                            ${generateStars(book.rating)}
                            <span class="count">${book.rating}(${book.reviewCount}reviews)</span>
                        </div>
                        <div>
                            <span class="book-category">${book.category}</span>
                        </div>
                    </div>
                    <div class="book-price">
                        $${book.price.toFixed(2)}
                        ${book.originalPrice ? 
                            `<span class="original-price">$${book.originalPrice.toFixed(2)}</span>`:''}
                            ${discount>0?`<span class="discount">-${discount}%</span>`:''}
                    </div>
                </div>
                <div class="book-actions-column">
                    <button class="btn-view-details" onclick="viewBook(${book.id})" style="margin-bottom:10px;">
                        <i class="fas fa-eye"></i>
                        View Details
                    </button>
                    <button class="btn-add-to-cart ${isInCart ? 'added':''}"
                        onclick="addToCart(${book.id})"
                        ${isInCart ? 'disabled':''}
                        style="width:100%;">
                        <i class="fas ${isInCart ? 'fa-check':'fa-cart-plus'}"></i>
                        ${isInCart ? 'Added to Cart':'Add to Cart'}
                    </button>
                </div>
                `;
                listView.appendChild(bookItem);
            });
        }

        function showNoResults()
        {
            const booksDisplay=document.getElementById('books-display');
            booksDisplay.innerHTML=`
                <div class="no-results">
                    <i class="fas fa-book-open"></i>
                    <h3>No Books Found</h3>
                    <p>Try adjusting your filters or search criteria.</p>
                    <button class="btn-primary" onclick="clearFilters()" style="margin-top:20px;">
                        <i class="fas fa-filter-circle-xmark"></i>
                        Clear All Filters
                    </button>
                </div>
            `;
        }

        function generateStars()
        {
            let stars='';
            const fullStars=Math.floor(rating);
            const halfStar=rating%1>=0.5;

            for(let i=0;i<fullStars;i++)
            {
                stars+='<i class="fas fa-star"></i>';
            }
            if(halfStar)
            {
                stars+='<i class="fas fa-star-half-alt"></i>';
            }

            const emptyStars=5-fullStars-(halfStar ? 1:0);
            for(let i=0;i<emptyStars;i++)
            {
                stars+='<i class="fas-fa-star"></i>';
            }

            return stars;
        }
        function renderPagination()
        {
            const totalPages=Math.ceil(filteredBooks.length/booksPerPage);
            const pagination=document.getElementById('pagination');

            if(totalPages<=1)
            {
                pagination.innerHTML='';
                return;
            }

            let paginationHTML='';

            paginationHTML+=`
                <button class="page-btn ${currentPage===1 ? 'disabled':''}"
                    onclick="changePage(${currentPage-1})"${currentPage===1 ? 'disabled':''}>
                    <i class="fas fa-chevron-left"></i>
                </button>
            `;

            let startPage=Math.max(1,currentPage-2);
            let endPage=Math.min(totalPages,startPage+4);

            if(endPage-startPage<4)
            {
                startPage=Math.max(1,endPage-4);
            }
            if(startPage>1)
            {
                paginationHTML+=`
                    <button class="page-btn" onclick="changePage(1)">1</button>
                    ${startPage>2 ? '<span class="page-dots">...</span>':''}
                    `;
            }

            for(let i=startPage;i<=endPage;i++)
            {
                paginationHTML+=`
                    <button class="pagr-btn ${currentPage===i ? 'active':''}"
                        onclick="changePage(${i})">
                        ${i}
                    </button>
                    `;
            }

            if(endPage<totalPages)
            {
                paginationHTML+=`
                    ${endPage<totalPages-1?'<span class="page-dots">...</span>':''}
                    <button class="page-btn" onclick="changePage(${totalPages})">${totalPages}</button>
                    `;
            }

            paginationHTML+=`
                <button class="page-btn ${currentPage===totalPages ? 'disabled':''}"
                    onclick="changePage(${currentPage+1})"${currentPage===totalPages?'disabled':''}>
                    <i class=="fas fa-chevron-right"></i>
                </button>
                `;
            pagination.innerHTML=paginationHTML;
        }

        function changePage(page)
        {
            const totalPages=Math.ceil(filteredBooks.length/booksPerPage);
            if(page<1||page>totalPages) return;
            currentPage=page;
            renderBooks();
            renderPagination();

            document.querySelector('.results-header').scrollIntoView({behavior:'smooth'});
        }

        function viewBook(bookId)
        {
            const book=booksData.find(b=>b.id===bookId);
            if(book)
            {
                window.location.href=`bookdetail${bookId}.html?id=${bookId}`;
            }
        }

        function addToCart(bookId)
        {
            const book=booksData.find(b=>b.id===bookId);
            if(!book) return;
            if(shoppingCart.some(item=>item.id===bookId))
            {
                alert('This book is already in your cart!');
                return;
            }

            shoppingCart.push({
                id:book.id,
                tittle:book.tittle,
                price:book.price,
                quantity:1,
                cover:`Book Cover : ${book.tittle}`
            });

            localStorage.setItem('bookverse_cart',JSON.stringify(shoppingCart));

            updateCartCount();

            if(currentView==='grid')
            {
                const button=document.querySelector(`#grid-view .btn-add-to-cart[onclick="addToCart(${bookId})"]`);
                if(button)
                {
                   button.classList.add('added');
                   button.innerHTML='<i class="fas fa-check"></i>Added';
                   button.disabled=true; 
                }
            }
            else
            {
                const button=document.querySelector(`#list-view .btn-add-to-cart[onclick="addToCart(${book.Id})"]`);
                if(button)
                {
                   button.classList.add('added');
                   button.innerHTML='<i class="fas fa-check"></i>Added to Cart';
                   button.disabled=true; 
                }
            }

            showNotification(`${book.tittle} added to cart!`);
        }

        function updateCartCount()
        {
            const cartCount=document.getElementById('cart-count');
            cartCount.textContent=shoppingCart.length;
        }

        function showNotification()
        {
            const notification=document.createElement('div');
            notification.style.cssText=`
                position:fixed;
                top:20px;
                right:20px;
                background:#4caf50;
                color:white;
                padding:15px 20px;
                border-radius:8px;
                box-shadow:0 4px 12px rgba(0,0,0,0.15);
                z-index:1000;
                display:flex;
                align-items:center;
                gap:10px;
                animation:slideIn 0.3s ease;
            `;
            notification.innerHTML=`
                <i class="fas fa-check-cirsle"></i>
                <span>${message}</span>
            `;

            document.body.appendChild(notification);

            setTimeout(()=>{
                notification.style.animation='slideOut 0.3s ease;';
                setTimeout(()=>{
                    document.body.removeChild(notification);
                },300);
            },3000);

            if(!document.getElementById('notification-styles'))
            {
                const style=document.createElement('style');
                style.id='notification-style';
                style.textContent=`
                    @keyframe slideIn
                    {
                        from
                        {
                            trasform:translateX(100%);
                            opacity:0;
                        }
                        to
                        {
                            transform:translateX(0);
                            opacity:1;
                        }
                    }
                    @keyframe slideOut{
                        from{
                            transform:translateX(0);
                            opacity:1;
                        }
                        to{
                            transform:translateX(0);
                            opacity:1;
                        }
                    }
                `;
                document.head.appendChild(style);
            }
            
        }
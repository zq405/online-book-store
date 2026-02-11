let shoppingCart=JSON.parse(localStorage.getItem('bookverse_cart'))||[];
        let userReviews=[...bookData.reviews];

        document.addEventListener('DOMContentLoaded',function()
        {
            const urlParams=new URLSearchParams(window.location.search);
            const bookId=urlParams.get('id')||1;
            loadBookData(bookData);
            updateCartCount();
            setupRatingInput();
        });

        function loadBookData(book)
        {
            document.getElementById('book-tittle').textContent=book.tittle;
            document.getElementById('cover-tittle').textContent=book.tittle;
            document.getElementById('book-author').innerHTML=`<i class="fas fa-user-pen"></i>${book.author}`;
            document.getElementById('cover-author').textContent=`by ${book.author}`;
    
            document.getElementById('book-description').innerHTML=book.description;

            const currentPrice=document.getElementById('current-price');
            const originalPrice=document.getElementById('original-price');
            const discountPercent=document.getElementById('discount-percent');
            const priceSave=document.getElementById('price-save');
            currentPrice.textContent=`$${book.price.toFixed(2)}`;

            if(book.originalPrice)
            {
                const discount=Math.round((1-book.price/book.originalPrice)*100);
                const saveAmount=book.originalPrice-book.price;
                originalPrice.textContent=`$${book.originalPrice.toFixed(2)}`;
                originalPrice.style.display='inline';
                discountPercent.textContent=`-${discount}%`;
                discountPercent.style.display='inline';
                priceSave.textContent=`Save $${saveAmount.toFixed(2)}`;
                priceSave.style.display='block';
            }

            document.getElementById('rating-number').textContent=book.rating;
            document.getElementById('rating-count').textContent=`(${book.reviewCount}reviews)`;
            document.getElementById('average-rating').textContent=book.rating;
            document.getElementById('total-review-count').textContent=`${book.reviewCount}reviews`;

            generateStars('rating-stars',book.rating);
            generateStars('average-rating-stars',book.rating);

            generateRatingBars();

            const badgesContainer=document.getElementById('book-badged');
            badgesContainer.innerHTML='';
            if(book.isBestseller)
            {
                const badge=document.createElement('span');
                badge.className='badge bestseller';
                badge.innerHTML='<i class="fas fa-crown"></i>Bestseller';
                badgesContainer.appendChild(badge);
            }
            if(book.isNew)
            {
                const badge=document.createElement('span');
                badge.className='badge new';
                badge.innerHTML='<i class="fas fa-star"></i>New Release';
                badgeContainer.appendChild(badge);
            }
            if(book.originalPrice)
            {
                const badge=document.createElement('span');
                badge.className='badge discount';
                const discount=Math.round((1-book.price/book.originalPrice)*100);
                badge.innerHTML=`<i class="fas fa-tag"></i>${discount}% OFF`;
                badgesContainer.appendChild(badge);
            }

            document.getElementById('meta-pages').textContent=book.page;
            document.getElementById('meta-published').textContent=book.publishDate;
            document.getElementById('meta-isbn').textContent=book.isbn;

            const featuresGrid=document.getElementById('features-grid');
            featuresGrid.innerHTML='';
            book.features.forEach(feature=>{
                const featureItem=document.createElement('div');
                featureItem.className='feature-item';
                featureItem.innerHTML=`
                <div class="feature-icon">
                    <i class="${feature.icon}"></i>
                </div>
                <div class="feature-text">
                    <div class="feature-tittle">${feature.tittle}</div>
                    <div class="feature-desc">${feature.description}</div>
                </div>
            `;
            featuresGrid.appendChild(featureItem);
            });
            const tocContainer=document.getElementById('table-contents');
            tocContainer.innerHTML='';
            book.tableContents.forEach((chapter,index)=>{
                const chapterElement=document.createElement('div');
                chapterElement.style.marginBottom='5px';
                chapterElement.innerHTML=`<strong>${index+1}.</strong>${chapter}`;
                tocContainer.appendChild(chapterElement);
            });
            document.getElementById('author-bio').innerHTML=book.authorBio;
            loadReviews();
            loadRelatedBooks();
            const isInCart=shoppingCart.some(item=>item.id===book.id);
            if(isInCart)
            {
                const addToCartBtn=document.getElementById('btn-add-to-cart');
                addToCartBtn.classList.add('added');
                addToCartBtn.innerHTML='<i class="fas fa-check"></i>Added to Cart';
                addToCartBtn.disabled=true;
            }
        }

        function generateStars(elementId,rating)
        {
            const element=document.getElementById(elementId);
            element.innerHTML='';
            const fullStars=Math.floor(rating);
            const halfStar=rating%1>=0.5;
            for(let i=0;i<fullStars;i++)
            {
                const star=document.createElement('i');
                star.className='fas fa-star';
                element.appendChild(star);
            }
            if(halfStar)
            {
                const star=document.createElement('i');
                star.className='fas fa-star-half-alt';
                element.appendChild(star);
            }
            const emptyStars=5-fullStars-(halfStar?1:0);
            for(let i=0;i<emptyStars;i++)
            {
                const star=document.createElement('i');
                star.className='fas fa-star';
                element.appendChild(star);
            }
        }

        function generateRatingBars()
        {
            const ratingBars=document.querySelector('.rating-bars');
            ratingBars.innerHTML='';
            const distribution=
            {
                5:58,
                4:25,
                3:12,
                2:3,
                1:2
            };
            for(let i=5;i>=1;i--)
            {
                const bar=document.createElement('div');
                bar.className='rating-bar';
                const label=document.createElement('div');
                label.className='raing-label';
                label.innerHTML=`${i}<i class="fas fa-star" style="color:#ffc107;"></i>`;
                const barContainer=document.createElement('div');
                barContainer.className='rating-bar-fill';
                const barFill=document.createElement('div');
                barFill.className='rating-bar-fill'
                barFill.style.width=`${distribution[i]}%`;
                barContainer.appendChild(barFill);
                const percentage=document.createElement('div');
                percentage.style.width='40px';
                percentage.style.textAlign='right';
                percentage.style.fontSize='0.9rem';
                percentage.style.color='#666';
                percentage.textContent=`${distribution[i]}%`;
                bar.appendChild(label);
                bar.appendChild(barContainer);
                bar.appendChild(percentage);
                ratingBars.appendChild(bar);
            }
        }

        function loadReviews()
        {
            const reviewList=document.getElementById('review-list');
            reviewList.innerHTML='';
            if(userReviews.length===0)
            {
               reviewList.innerHTML=`
                <div style="text-align:center; padding:40px; color:#666;">
                    <i class="fas fa-comment-slash" style="font-size:3rem; margin-bottom:15px; color:#e0e0e0;"></i>
                    <h3>No Reviews Yet</h3>
                    <p>Be the first to review this book!</p>
                </div>
                `;
                return; 
            }
            userReviews.forEach(review=>{
                const reviewItem=document.createElement('div');
                reviewItem.className='review-item';
                let starsHTML='';
                for(let i=1;i<=5;i++)
                {
                    if(i<=review.rating)
                    {
                       starsHTML+='<i class="fas fa-star"></i>'; 
                    }
                    else
                    {
                        starsHTML+='<i class="fas fa-star"></i>';
                    }
                }
                reviewItem.innerHTML=`
                    <div class=review-header>
                        <div class="reviewr-info">
                            <div class="reviewer-avatar">${review.name.charAt(0)}</div>
                            <div>
                                <div class="reviewer-name">${review.name}</div>
                                <div class="review-date">${review.date}</div>
                            </div>
                        </div>
                        <div class="review-rating">${starsHTML}</div>
                    </div>
                    <h4 style="color:#333; margin-bottom:10px;">${review.tittle}</h4>
                    <div class="review-content">${review.content}</div>
                    <div class="review-actions">
                        <button class="review-action" onclick="markReviewHelpful(${review.id})">
                            <i class="fas fa-thumbs-up"></i>
                            Helpful(${review.helpful})
                        </button>
                        <button class="review-action" onclick="markReviewNotHelpful(${review.id})">
                            <i class="fas fa-thumbs-down"></i>
                            Not Helpful(${review.notHelpful})
                        </button>
                        <button class="review-action" onclick="reportReviews(${review.id})">
                            <i class="fas fa-flag"></i>
                            Report
                        </button>
                    </div>
                    `;
                    reviewList.appendChild(reviewItem);
            });
        }

        function loadRelatedBooks()
        {
            const relatedBooks=document.getElementById('related-books');
            relatedBooks.innerHTML='';
            bookData.relatedBooks.forEach(book=>{
                const bookCard=document.createElement('div');
                bookCard.className='related-book-card';
                const priceHTML=book.originalPrice?
                    `<div>
                        <span style="font-size:1rem; color:#999; text-decoration:line-throug;">$${book.originalPrice.toFixed(2)}</span>
                        <span>$${book.price.toFixed(2)}</span>
                    </div>`:`<div>$${book.price.toFixed(2)}</div>`;
                bookCard.innerHTML=`
                    <div class="related-book-cover">
                        ${book.tittle}
                    </div>
                    <div class="related-book-info">
                        <div class="related-book-tittle">${book.tittle}</div>
                        <div class="related-book-author">by ${book.author}</div>
                        <div class="related-book-price">${priceHTML}
                            <button class="btn-view-related" onclick="viewBook(${book.id})">View</button>
                        </div>
                    </div>
                    `;
                    relatedBooks.appendChild(bookCard);
            });
        }

        function setupRatingInput()
        {
            const stars=document.querySelectorAll('#review-rating i');
            const selectedRatingInput=document.getElementById('selected-rating');
            stars.forEach(star=>{
                star.addEventListener('mouseover',function(){
                    const rating=parseInt(this.dataset.rating);
                    highlightStars(rating);
                });
                star.addEventListener('mouseout',function(){
                    const currentRating=parseInt(selectedRatingInput.value);
                    highlightStars(currentRating);
                });
                star.addEventListener('click',function(){
                    const rating=parseInt(this.dataset.rating);
                    selectedRatingInput.value=rating;
                    highlightStars(rating);
                });
            });
        }

        function highlightStars(rating)
        {
            const stars=document.querySelectorAll('#review-rating i');
            stars.forEach(star=>{
                const starRating=parseInt(star.dataset.rating);
                star.classList.remove('selected','hovered');
                if(starRating<=rating)
                {
                   star.classList.add('hovered'); 
                }
                if(starRating<=parseInt(document.getElementById('selected-rating').value))
                {
                    star.classList.add('selected');
                }
            });
        }

        function addTocart()
        {
            if(shoppingCart.some(item=>item.id===bookData.id))
            {
                showNotification('This book is already in your cart!');
                return;
            }
            shoppingCart.push({
                id:bookData.id,
                tittle:bookData.tittle,
                price:bookData.price,
                quantity:1,
                cover:`Book Cover: ${bookData,tittle}`
            });
            localStorage.setItem('bookverse_cart',JSON.stringify(shoppingCart));
            updateCartCount();
            const addToCartBtn=document.getElementById('btn-add-to-cart');
            addToCartBtn.classList.add('added');
            addToCartBtn.innerHTML='<i class="fas fa-check"></i>Added to Cart';
            addToCartBtn.disabled=true;
            showNotification(`${bookData.tittle}added to cart`);
        }

        function buyNow()
        {
            if(!shoppingCart.some(item=>item.id===bookData.id))
            {
                shoppingCart.push({
                    id:bookData.id,
                    tittle:bookData.tittle,
                    price:bookData.price,
                    quantity:1,
                    cover:`Book Cover: ${bookData.tittle}`
                });
                localStorage.setItem('bookverse_cart',JSON.stringify(shoppingCart));
                updateCartCount();
            }
            window.location.href='payment.html';
        }

        function submitReview(event)
        {
            event.preventDefault();
            const rating=parseInt(document.getElementById('selected-rating').value);
            const name=document.getElementById('review-name').value.trim();
            const email=document.getElementById('review=email').value.trim();
            const tittle=document.getElementById('review-tittle').value.trim();
            const content=document.getElementById('review-content').value.trim();
            if(rating===0)
            {
                showNotification('Please select a rating','error');
                return;
            }
            if(!name||!email||!tittle||!content)
            {
                showNotification('Please fil in all required fiedls','error');
                return;
            }
            const newReview={
                id: userReviews.length+1,
                name:name,
                date:new Date().toLocaleDateString('en-US',{
                    year:'numeric',
                    month:'long',
                    day:'numeric',
                }),
                rating:rating,
                tittle:tittle,
                content:content,
                helpful:0,
                notHelpful:0
            };
            userReviews.unshift(newReview);
            const totalRating=userReviews.reduce((sum,review)=>sum +review.rating,0);
            docuemnt.getElementById('rating-number').textContent=averageRating;
            document.getElementById('average-rating').textContent=averageRating;
            document.getElementById('rating-count').textContent=`(${userReviews,length}reviews)`;
            generateStars('rating-stars',averageRating);
            generateStars('average-rating=stars',averageRating);
            loadReviews();
            clearReviewForm();
            showNotification('Thank you for your review');
            setTimeout(()=>{
                document.querySelector('.review-section').scrollIntoView({
                    behavior:'smooth'
                });
            },500);
        }

        function clearReviewForm()
        {
            document.getElementById('review-form-element').reset();
            document.getElementById('selected-rating').value=0;
            const stars=document.querySelectorAll('#review-rating i');
            stars.forEach(star=>{
                star.classList.remove('selected','hovered');
            });
        }

        function scrollToReviewForm()
        {
            document.getElementById('review-form').scrollIntoView({
                behavior:'smooth'
            });
        }

        function viewBook(bookId)
        {
            window.location.href=`bookdetail${bookId}.html?id=${bookId}`;
        }

        function markReviewHelpful(reviewId)
        {
            const review=userReviews.find(r=>r.id===reviewId);
            if(review)
            {
               review.helpful++;
               loadReviews();
               showNotification('Thank you for your feedback'); 
            }
        }

        function markReviewNotHelpful(reviewId)
        {
            const review=userReviews.find(r=>r.id===reviewId)
            if(review)
            {
                review.notHelpful++;
                loadReviews();
                showNotification('Thank you for your feedback');
            }
        }

        function reportReviews(reviewId)
        {
            if(confirm('Report this review as inapproproate?'))
            {
                showNotification('Review reported. Thank you for helping us maintain quality content');
            }
        }

        function updateCartCount()
        {
            const cartCount=document.getElementById('cart-count');
            cartCount.textContent=shoppingCart.length;
        }

        function showNotification(message,type='success')
        {
            const notification=document.createElement('div');
            notification.className='notification';
            notification.style.background=type==='error'?'#ff5252':'#4caf50';
            notification.innerHTML=`
                <i class="fas ${type==='error'?'fa-exclamation-circle':'fa-check-circle'}"></i>
                <span>${message}</span>`;
            document.body.appendChild(notification);
            setTimeout(()=>{
                notification.style.animation='slideout 0.3s ease';
                setTimeout(()=>{
                    if(notification.parseNode)
                    {
                        document.body.removeChild(notification);
                    }
                },300);
            },3000);
        }
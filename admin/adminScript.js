/*global function*/
function logout() {
    if (confirm("Are you sure you want to logout?")) {
        localStorage.removeItem("currentAdminUser");
        window.location.href = "adminLogin.html";
    }
}

/*page function*/
document.addEventListener("DOMContentLoaded", function() {
    
    const isLoginPage = window.location.pathname.includes("adminLogin.html");
    const currentUser = localStorage.getItem("currentAdminUser");

    if (!isLoginPage && !currentUser) {
        window.location.href = "adminLogin.html";
    }

    const nameDisplay = document.getElementById("displayUsername");
    const initDisplay = document.getElementById("displayInitials");
    if (nameDisplay && currentUser) {
        nameDisplay.textContent = currentUser;
        if(initDisplay) initDisplay.textContent = currentUser.substring(0, 2).toUpperCase();
    }

    const productGrid = document.getElementById("productGrid");
    if (productGrid) {
        renderProducts();
    }
    
    const staffGrid = document.getElementById("staffGrid");
    if (staffGrid) {
        renderStaff();
    }

    const memberGrid = document.getElementById("memberGrid");
    if (memberGrid) {
        renderMembers();
    }

    const categoryGrid = document.getElementById("categoryGrid");
    if (categoryGrid) {
        renderCategories();
    }

    const orderGrid = document.getElementById("orderGrid");
    if (orderGrid) {
        renderOrders();
    }

    const salesChartCanvas = document.getElementById("salesChart");
    if (salesChartCanvas) {
        renderSalesReport();
    }

    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", handleLogin);
    }
});

/*login function*/

function handleLogin(event) {
    event.preventDefault();
    
    const adminCredentials = { 
        username: "ku", 
        email: "ku@bookverse.com", 
        password: "admin123" 
    };

    const usernameInput = document.getElementById("username").value.trim();
    const passwordInput = document.getElementById("password").value.trim();
    const errorMsg = document.getElementById("errorMessage");

    if (errorMsg) errorMsg.style.display = "none";

    if (usernameInput === "" || passwordInput === "") {
        alert("Please enter both username and password.");
        return;
    }

    if ((usernameInput === adminCredentials.username || usernameInput === adminCredentials.email) && 
        passwordInput === adminCredentials.password) {
        
        localStorage.setItem("currentAdminUser", usernameInput);
        
        const btn = document.querySelector(".login-btn");
        if(btn) {
            btn.textContent = "Success! Redirecting...";
            btn.style.backgroundColor = "#2ecc71";
        }
        
        setTimeout(() => window.location.href = "adminDashboard.html", 1000);

    } else {
        if(errorMsg) {
            errorMsg.textContent = "Invalid username or password.";
            errorMsg.style.display = "block";
        } else {
            alert("Invalid login.");
        }
        document.getElementById("password").value = "";
    }
}

/*product function*/

function renderProducts() {
    const grid = document.getElementById("productGrid");
    if (!grid) return;

    let products = JSON.parse(localStorage.getItem('bookverse_products'));

    if (!products) {
        products = [
            { 
                id: 1, 
                title: "The Digital Revolution", 
                price: "49.90", 
                status: "Published", 
                image: "imageProducts/the-digital-revolution.jpg" 
            },
            { 
                id: 2, 
                title: "Web Design Mastery", 
                price: "59.00", 
                status: "Published", 
                image: "imageProducts/web-design-mastery.jpg" 
            },
            { 
                id: 3, 
                title: "Python for Beginners", 
                price: "39.50", 
                status: "Draft", 
                image: "imageProducts/python-for-beginners.png" 
            }
        ];
        localStorage.setItem('bookverse_products', JSON.stringify(products));
    }

    grid.innerHTML = "";

    products.forEach(product => {
        let badgeClass = product.status === 'Published' ? 'badge-published' : 'badge-draft';

        let hasImage = product.image && product.image.trim() !== "";
        let imageContent = hasImage
            ? `<img src="${product.image}" alt="${product.title}">`
            : `<div class="no-image"><i class="fas fa-book fa-3x"></i></div>`;

        let cardHTML = `
            <div class="product-card">
                <div class="product-image-container">
                    ${imageContent}
                    <span class="status-badge ${badgeClass}">${product.status}</span>
                </div>
                
                <div class="product-info">
                    <h3 class="product-title">${product.title}</h3>
                    <div class="product-meta">
                        <span class="price-tag">RM ${parseFloat(product.price).toFixed(2)}</span>
                    </div>
                    
                    <div class="action-buttons">
                        <button onclick="editProduct(${product.id})" class="btn-icon edit">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button onclick="deleteProduct(${product.id})" class="btn-icon delete">
                            <i class="fas fa-trash"></i> Remove
                        </button>
                    </div>
                </div>
            </div>
        `;
        grid.innerHTML += cardHTML;
    });
}

function openModal() {
    const modal = document.getElementById('productModal');
    if(modal) {
        document.getElementById('productId').value = "";
        document.getElementById('bookTitle').value = "";
        document.getElementById('bookPrice').value = "";
        document.getElementById('bookImage').value = "";
        document.getElementById('bookStatus').value = "Published";
        
        modal.querySelector('h2').textContent = "Add New Book";
        modal.style.display = 'flex';
    }
}

function editProduct(id) {
    let products = JSON.parse(localStorage.getItem('bookverse_products')) || [];
    const product = products.find(p => p.id === id);

    if (product) {
        document.getElementById('productId').value = product.id;
        document.getElementById('bookTitle').value = product.title;
        document.getElementById('bookPrice').value = product.price;
        document.getElementById('bookImage').value = product.image;
        document.getElementById('bookStatus').value = product.status;

        const modal = document.getElementById('productModal');
        modal.querySelector('h2').textContent = "Edit Book Details";
        modal.style.display = 'flex';
    }
}

function closeModal() {
    const modal = document.getElementById('productModal');
    if(modal) modal.style.display = 'none';
}

function saveProduct(event) {
    event.preventDefault();

    const id = document.getElementById('productId').value;
    const title = document.getElementById('bookTitle').value;
    const price = document.getElementById('bookPrice').value;
    const status = document.getElementById('bookStatus').value;
    const image = document.getElementById('bookImage').value;

    let products = JSON.parse(localStorage.getItem('bookverse_products')) || [];

    if (id) {
        const index = products.findIndex(p => p.id == id);
        if (index !== -1) {
            products[index] = {
                id: parseInt(id),
                title: title,
                price: price,
                status: status,
                image: image
            };
            alert("Book updated successfully!");
        }
    } else {
        products.push({
            id: Date.now(),
            title: title,
            price: price,
            status: status,
            image: image
        });
        alert("New book added successfully!");
    }

    localStorage.setItem('bookverse_products', JSON.stringify(products));
    
    closeModal();
    renderProducts();
}

function deleteProduct(id) {
    if(confirm("Are you sure you want to delete this book?")) {
        let products = JSON.parse(localStorage.getItem('bookverse_products')) || [];
        products = products.filter(p => p.id !== id);
        localStorage.setItem('bookverse_products', JSON.stringify(products));
        renderProducts();
    }
}

/*staff function*/

function renderStaff() {
    const grid = document.getElementById("staffGrid");
    if (!grid) return;

    let staffList = JSON.parse(localStorage.getItem('bookverse_staff'));

    if (!staffList) {
        staffList = [
            { id: 1, name: "Sky", email: "sky@bookverse.com", role: "Manager", status: "Active" },
            { id: 2, name: "Chin", email: "chin@bookverse.com", role: "Staff", status: "Active" }
        ];
        localStorage.setItem('bookverse_staff', JSON.stringify(staffList));
    }

    grid.innerHTML = "";

    staffList.forEach(staff => {
        let statusColor = staff.status === 'Active' ? 'green' : 'red';
        let statusBg = staff.status === 'Active' ? '#dcfce7' : '#fee2e2';

        let rowHTML = `
            <tr>
                <td>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <div style="width: 35px; height: 35px; background: #e0f2fe; color: #0d47a1; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">
                            ${staff.name.charAt(0)}
                        </div>
                        ${staff.name}
                    </div>
                </td>
                <td>${staff.email}</td>
                <td><span style="background: #f3f4f6; padding: 2px 8px; border-radius: 4px; font-size: 12px;">${staff.role}</span></td>
                <td>
                    <span style="color: ${statusColor}; background: ${statusBg}; padding: 4px 8px; border-radius: 12px; font-size: 12px; font-weight: 600;">
                        ${staff.status}
                    </span>
                </td>
                <td>
                    <button onclick="editStaff(${staff.id})" style="color: #2563eb; background: none; border: none; cursor: pointer; margin-right: 10px;"><i class="fas fa-edit"></i></button>
                    <button onclick="deleteStaff(${staff.id})" style="color: red; background: none; border: none; cursor: pointer;"><i class="fas fa-trash"></i></button>
                </td>
            </tr>
        `;
        grid.innerHTML += rowHTML;
    });
}

function openStaffModal() {
    const modal = document.getElementById('staffModal');
    document.getElementById('staffId').value = "";
    document.getElementById('staffName').value = "";
    document.getElementById('staffEmail').value = "";
    document.getElementById('staffRole').value = "Staff";
    document.getElementById('staffStatus').value = "Active";
    
    modal.querySelector('h2').textContent = "Add New Staff";
    modal.style.display = 'flex';
}

function closeStaffModal() {
    document.getElementById('staffModal').style.display = 'none';
}

function editStaff(id) {
    let staffList = JSON.parse(localStorage.getItem('bookverse_staff')) || [];
    const staff = staffList.find(s => s.id === id);

    if (staff) {
        document.getElementById('staffId').value = staff.id;
        document.getElementById('staffName').value = staff.name;
        document.getElementById('staffEmail').value = staff.email;
        document.getElementById('staffRole').value = staff.role;
        document.getElementById('staffStatus').value = staff.status;
        
        const modal = document.getElementById('staffModal');
        modal.querySelector('h2').textContent = "Edit Staff";
        modal.style.display = 'flex';
    }
}

function saveStaff(event) {
    event.preventDefault();
    
    const id = document.getElementById('staffId').value;
    const name = document.getElementById('staffName').value;
    const email = document.getElementById('staffEmail').value;
    const role = document.getElementById('staffRole').value;
    const status = document.getElementById('staffStatus').value;

    let staffList = JSON.parse(localStorage.getItem('bookverse_staff')) || [];

    if (id) {
        const index = staffList.findIndex(s => s.id == id);
        if (index !== -1) {
            staffList[index] = { id: parseInt(id), name, email, role, status };
            alert("Staff updated!");
        }
    } else {
        staffList.push({ id: Date.now(), name, email, role, status });
        alert("New staff added!");
    }

    localStorage.setItem('bookverse_staff', JSON.stringify(staffList));
    closeStaffModal();
    renderStaff();
}

function deleteStaff(id) {
    if(confirm("Delete this staff member?")) {
        let staffList = JSON.parse(localStorage.getItem('bookverse_staff')) || [];
        staffList = staffList.filter(s => s.id !== id);
        localStorage.setItem('bookverse_staff', JSON.stringify(staffList));
        renderStaff();
    }
}

/*member function*/

function renderMembers() {
    const grid = document.getElementById("memberGrid");
    if (!grid) return;

    let memberList = JSON.parse(localStorage.getItem('bookverse_members'));

    // Default Members
    if (!memberList) {
        memberList = [
            { id: 1, name: "Wong Jian Shen", email: "shen@gmail.com", tier: "Gold", status: "Active" },
            { id: 2, name: "Sanjaif Nathan", email: "san@yahoo.com", tier: "Silver", status: "Active" },
            { id: 3, name: "Emir Abraham", email: "emir@gmail.com", tier: "Bronze", status: "Banned" }
        ];
        localStorage.setItem('bookverse_members', JSON.stringify(memberList));
    }

    grid.innerHTML = "";

    memberList.forEach(member => {
        // Color Logic
        let statusColor = member.status === 'Active' ? 'green' : 'red';
        let statusBg = member.status === 'Active' ? '#dcfce7' : '#fee2e2';
        
        // Tier Badges
        let tierColor = '#374151';
        let tierBg = '#f3f4f6';
        if (member.tier === 'Gold') { tierColor = '#b45309'; tierBg = '#fef3c7'; } // Gold/Yellow
        if (member.tier === 'Silver') { tierColor = '#475569'; tierBg = '#e2e8f0'; } // Gray/Silver

        let rowHTML = `
            <tr>
                <td><b>${member.name}</b></td>
                <td>${member.email}</td>
                <td>
                    <span style="background: ${tierBg}; color: ${tierColor}; padding: 2px 8px; border-radius: 4px; font-size: 12px; font-weight:bold;">
                        ${member.tier}
                    </span>
                </td>
                <td>
                    <span style="color: ${statusColor}; background: ${statusBg}; padding: 4px 8px; border-radius: 12px; font-size: 12px; font-weight: 600;">
                        ${member.status}
                    </span>
                </td>
                <td>
                    <button onclick="editMember(${member.id})" style="color: #2563eb; background: none; border: none; cursor: pointer; margin-right: 10px;"><i class="fas fa-edit"></i></button>
                    <button onclick="deleteMember(${member.id})" style="color: red; background: none; border: none; cursor: pointer;"><i class="fas fa-trash"></i></button>
                </td>
            </tr>
        `;
        grid.innerHTML += rowHTML;
    });
}

function openMemberModal() {
    const modal = document.getElementById('memberModal');
    document.getElementById('memberId').value = "";
    document.getElementById('memberName').value = "";
    document.getElementById('memberEmail').value = "";
    document.getElementById('memberTier').value = "Bronze";
    document.getElementById('memberStatus').value = "Active";
    
    modal.querySelector('h2').textContent = "Add New Member";
    modal.style.display = 'flex';
}

function closeMemberModal() {
    document.getElementById('memberModal').style.display = 'none';
}

function editMember(id) {
    let memberList = JSON.parse(localStorage.getItem('bookverse_members')) || [];
    const member = memberList.find(m => m.id === id);

    if (member) {
        document.getElementById('memberId').value = member.id;
        document.getElementById('memberName').value = member.name;
        document.getElementById('memberEmail').value = member.email;
        document.getElementById('memberTier').value = member.tier;
        document.getElementById('memberStatus').value = member.status;
        
        const modal = document.getElementById('memberModal');
        modal.querySelector('h2').textContent = "Edit Member";
        modal.style.display = 'flex';
    }
}

function saveMember(event) {
    event.preventDefault();
    
    const id = document.getElementById('memberId').value;
    const name = document.getElementById('memberName').value;
    const email = document.getElementById('memberEmail').value;
    const tier = document.getElementById('memberTier').value;
    const status = document.getElementById('memberStatus').value;

    let memberList = JSON.parse(localStorage.getItem('bookverse_members')) || [];

    if (id) {
        const index = memberList.findIndex(m => m.id == id);
        if (index !== -1) {
            memberList[index] = { id: parseInt(id), name, email, tier, status };
            alert("Member updated!");
        }
    } else {
        memberList.push({ id: Date.now(), name, email, tier, status });
        alert("New member added!");
    }

    localStorage.setItem('bookverse_members', JSON.stringify(memberList));
    closeMemberModal();
    renderMembers();
}

function deleteMember(id) {
    if(confirm("Are you sure you want to remove this member?")) {
        let memberList = JSON.parse(localStorage.getItem('bookverse_members')) || [];
        memberList = memberList.filter(m => m.id !== id);
        localStorage.setItem('bookverse_members', JSON.stringify(memberList));
        renderMembers();
    }
}

/*manage category function*/

function renderCategories() {
    const grid = document.getElementById("categoryGrid");
    if (!grid) return;

    let categories = JSON.parse(localStorage.getItem('bookverse_categories'));

    if (!categories) {
        categories = [
            { id: 1, name: "Technology", desc: "Books about coding, AI and hardware.", color: "#3b82f6" },
            { id: 2, name: "Business", desc: "Finance, marketing and leadership guides.", color: "#10b981" },
            { id: 3, name: "Fiction", desc: "Novels, sci-fi and fantasy stories.", color: "#8b5cf6" }
        ];
        localStorage.setItem('bookverse_categories', JSON.stringify(categories));
    }

    grid.innerHTML = "";

    categories.forEach(cat => {
        let cardHTML = `
            <div class="cat-card">
                <div class="color-strip" style="background: ${cat.color};"></div>
                
                <div class="cat-header">
                    <i class="fas fa-bookmark cat-icon" style="color: ${cat.color};"></i>
                    <div class="actions">
                        <button onclick="editCategory(${cat.id})" style="color: #2563eb; background:none; border:none; cursor:pointer; margin-right:8px;"><i class="fas fa-edit"></i></button>
                        <button onclick="deleteCategory(${cat.id})" style="color: red; background:none; border:none; cursor:pointer;"><i class="fas fa-trash"></i></button>
                    </div>
                </div>
                
                <h3 class="cat-title">${cat.name}</h3>
                <p class="cat-desc">${cat.desc}</p>
                
                <span style="font-size: 12px; color: #9ca3af;">ID: #${cat.id}</span>
            </div>
        `;
        grid.innerHTML += cardHTML;
    });
}

function openCategoryModal() {
    const modal = document.getElementById('categoryModal');
    document.getElementById('catId').value = "";
    document.getElementById('catName').value = "";
    document.getElementById('catDesc').value = "";
    document.getElementById('catColor').value = "#3b82f6";
    
    modal.querySelector('h2').textContent = "Add Category";
    modal.style.display = 'flex';
}

function closeCategoryModal() {
    document.getElementById('categoryModal').style.display = 'none';
}

function editCategory(id) {
    let categories = JSON.parse(localStorage.getItem('bookverse_categories')) || [];
    const cat = categories.find(c => c.id === id);

    if (cat) {
        document.getElementById('catId').value = cat.id;
        document.getElementById('catName').value = cat.name;
        document.getElementById('catDesc').value = cat.desc;
        document.getElementById('catColor').value = cat.color;
        
        const modal = document.getElementById('categoryModal');
        modal.querySelector('h2').textContent = "Edit Category";
        modal.style.display = 'flex';
    }
}

function saveCategory(event) {
    event.preventDefault();
    
    const id = document.getElementById('catId').value;
    const name = document.getElementById('catName').value;
    const desc = document.getElementById('catDesc').value;
    const color = document.getElementById('catColor').value;

    let categories = JSON.parse(localStorage.getItem('bookverse_categories')) || [];

    if (id) {
        const index = categories.findIndex(c => c.id == id);
        if (index !== -1) {
            categories[index] = { id: parseInt(id), name, desc, color };
            alert("Category updated!");
        }
    } else {
        categories.push({ id: Date.now(), name, desc, color });
        alert("New category added!");
    }

    localStorage.setItem('bookverse_categories', JSON.stringify(categories));
    closeCategoryModal();
    renderCategories();
}

function deleteCategory(id) {
    if(confirm("Delete this category?")) {
        let categories = JSON.parse(localStorage.getItem('bookverse_categories')) || [];
        categories = categories.filter(c => c.id !== id);
        localStorage.setItem('bookverse_categories', JSON.stringify(categories));
        renderCategories();
    }
}

/*orders function*/

function renderOrders() {
    const grid = document.getElementById("orderGrid");
    if (!grid) return;

    let orders = JSON.parse(localStorage.getItem('bookverse_orders'));

    if (!orders) {
        orders = [
            { 
                id: "ORD-1001", 
                customer: "bryan", 
                date: "2026-01-25", 
                total: "128.80", 
                status: "Pending",
                items: "1x Digital Revolution, 1x Python Book"
            },
            { 
                id: "ORD-1002", 
                customer: "maine", 
                date: "2026-01-27", 
                total: "59.00", 
                status: "Shipped",
                items: "1x Web Design Mastery"
            }
        ];
        localStorage.setItem('bookverse_orders', JSON.stringify(orders));
    }

    grid.innerHTML = "";

    orders.forEach(order => {
        let badgeColor = '#374151'; 
        let badgeBg = '#f3f4f6';
        if(order.status === 'Pending') { badgeColor = '#b45309'; badgeBg = '#fffbeb'; }
        if(order.status === 'Shipped') { badgeColor = '#1d4ed8'; badgeBg = '#eff6ff'; }
        if(order.status === 'Delivered') { badgeColor = '#15803d'; badgeBg = '#dcfce7'; }
        if(order.status === 'Cancelled') { badgeColor = '#b91c1c'; badgeBg = '#fee2e2'; }

        let rowHTML = `
            <tr>
                <td style="font-family: monospace; font-weight: bold;">${order.id}</td>
                <td>${order.customer}</td>
                <td>${order.date}</td>
                <td style="font-weight: bold;">RM ${order.total}</td>
                <td>
                    <span style="background: ${badgeBg}; color: ${badgeColor}; padding: 4px 10px; border-radius: 12px; font-size: 12px; font-weight: 600;">
                        ${order.status}
                    </span>
                </td>
                <td>
                    <button onclick="editOrder('${order.id}')" style="color: #2563eb; background: none; border: none; cursor: pointer; margin-right: 10px;" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button onclick="deleteOrder('${order.id}')" style="color: red; background: none; border: none; cursor: pointer;" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
        grid.innerHTML += rowHTML;
    });
}

function openOrderModal() {
    const modal = document.getElementById('orderModal');
    
    document.getElementById('orderId').value = "";
    document.getElementById('orderCustomer').value = "";
    document.getElementById('orderDate').value = new Date().toISOString().split('T')[0]; // Today's date
    document.getElementById('orderItems').value = "";
    document.getElementById('orderTotal').value = "";
    document.getElementById('orderStatus').value = "Pending";

    modal.querySelector('h2').textContent = "New Manual Order";
    modal.style.display = 'flex';
}

function editOrder(id) {
    let orders = JSON.parse(localStorage.getItem('bookverse_orders')) || [];
    const order = orders.find(o => o.id === id);

    if (order) {
        document.getElementById('orderId').value = order.id;
        document.getElementById('orderCustomer').value = order.customer;
        document.getElementById('orderDate').value = order.date;
        document.getElementById('orderItems').value = order.items || "";
        document.getElementById('orderTotal').value = order.total;
        document.getElementById('orderStatus').value = order.status;

        const modal = document.getElementById('orderModal');
        modal.querySelector('h2').textContent = "Edit Order Details";
        modal.style.display = 'flex';
    }
}

function saveOrder(event) {
    event.preventDefault();
    
    const id = document.getElementById('orderId').value;
    const customer = document.getElementById('orderCustomer').value;
    const date = document.getElementById('orderDate').value;
    const items = document.getElementById('orderItems').value;
    const total = document.getElementById('orderTotal').value;
    const status = document.getElementById('orderStatus').value;

    let orders = JSON.parse(localStorage.getItem('bookverse_orders')) || [];

    if (id) {
        const index = orders.findIndex(o => o.id === id);
        if (index !== -1) {
            orders[index] = { id, customer, date, total, status, items };
            alert(`Order ${id} updated!`);
        }
    } else {
        const newId = "ORD-" + Math.floor(1000 + Math.random() * 9000); // Generate Random ID
        orders.push({ id: newId, customer, date, total, status, items });
        alert("New order created successfully!");
    }

    localStorage.setItem('bookverse_orders', JSON.stringify(orders));
    closeOrderModal();
    renderOrders();
}

function deleteOrder(id) {
    if(confirm(`Are you sure you want to delete Order ${id}?`)) {
        let orders = JSON.parse(localStorage.getItem('bookverse_orders')) || [];
        orders = orders.filter(o => o.id !== id);
        localStorage.setItem('bookverse_orders', JSON.stringify(orders));
        renderOrders();
    }
}

function closeOrderModal() {
    document.getElementById('orderModal').style.display = 'none';
}

/*sales report function*/

function renderSalesReport() {
    let orders = JSON.parse(localStorage.getItem('bookverse_orders')) || [];
    
    let totalRevenue = 0;
    let pendingCount = 0;

    orders.forEach(order => {
        let amount = parseFloat(order.total.toString().replace('RM', '')); 
        totalRevenue += amount;

        if (order.status === 'Pending') {
            pendingCount++;
        }
    });

    document.getElementById('totalRevenue').textContent = "RM " + totalRevenue.toFixed(2);
    document.getElementById('totalOrders').textContent = orders.length;
    document.getElementById('pendingOrders').textContent = pendingCount;

    const ctx = document.getElementById('salesChart').getContext('2d');
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Revenue (RM)',
                data: [1200, 1900, 3000, 500, 2000, totalRevenue], // Last one is real total!
                backgroundColor: '#0d47a1',
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}
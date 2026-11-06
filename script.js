/**
 * YSSE IT Department - Web Development & CMS Wing
 * Week 5 Assignment: Course Search & Filter System
 */

// ============================================================================
// 1. COURSE DATA (Section 3A & 4B: Array of Objects - 10 Sample Courses)
// ============================================================================
const courses = [
  {
    id: 1,
    title: "Introduction to Web Development",
    category: "Web Development",
    level: "Beginner",
    duration: "4 Weeks",
    weeks: 4,
    featured: true,
    description: "Learn the fundamentals of web development using HTML5, CSS3, and responsive layouts.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    title: "Advanced Web Design",
    category: "Web Development",
    level: "Advanced",
    duration: "8 Weeks",
    weeks: 8,
    featured: false,
    description: "Master modern UI animations, CSS Grid architecture, design systems, and web accessibility.",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    title: "Frontend Development with JavaScript",
    category: "Web Development",
    level: "Intermediate",
    duration: "6 Weeks",
    weeks: 6,
    featured: true,
    description: "Build interactive user interfaces using vanilla JavaScript, DOM manipulation, and ES6+ features.",
    image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    title: "Python Programming Fundamentals",
    category: "Programming",
    level: "Beginner",
    duration: "5 Weeks",
    weeks: 5,
    featured: true,
    description: "Start your coding journey with Python variables, loops, functions, and problem-solving basics.",
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 5,
    title: "Object-Oriented Programming in Java",
    category: "Programming",
    level: "Intermediate",
    duration: "7 Weeks",
    weeks: 7,
    featured: false,
    description: "Understand classes, inheritance, polymorphism, and data structures for software engineering.",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 6,
    title: "Graphic Design & Brand Identity",
    category: "Graphic Design",
    level: "Beginner",
    duration: "4 Weeks",
    weeks: 4,
    featured: false,
    description: "Explore color theory, typography, visual hierarchy, and logo design principles from scratch.",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 7,
    title: "UI/UX Prototyping with Figma",
    category: "Graphic Design",
    level: "Intermediate",
    duration: "6 Weeks",
    weeks: 6,
    featured: false,
    description: "Design wireframes, interactive prototypes, and user-friendly digital product interfaces.",
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 8,
    title: "Digital Marketing & SEO Strategy",
    category: "Digital Marketing",
    level: "Beginner",
    duration: "4 Weeks",
    weeks: 4,
    featured: false,
    description: "Grow online visibility with Search Engine Optimization, content marketing, and social media campaigns.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 9,
    title: "Performance Marketing & Analytics",
    category: "Digital Marketing",
    level: "Advanced",
    duration: "6 Weeks",
    weeks: 6,
    featured: false,
    description: "Optimize paid ad campaigns, conversion funnels, and ROI tracking with Google Analytics.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 10,
    title: "Data Science & Machine Learning with Python",
    category: "Data Science",
    level: "Advanced",
    duration: "10 Weeks",
    weeks: 10,
    featured: true,
    description: "Analyze real-world datasets using Pandas, NumPy, data visualization, and predictive modeling.",
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=600&q=80"
  }
];

// ============================================================================
// 2. DOM ELEMENT SELECTION (Section 4E: getElementById & querySelector)
// ============================================================================
const courseContainer = document.getElementById("courseContainer");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const levelFilter = document.getElementById("levelFilter");
const sortSelect = document.getElementById("sortSelect");
const resetBtn = document.getElementById("resetBtn");
const showAllBtn = document.getElementById("showAllBtn");
const noResultsMessage = document.querySelector("#noResultsMessage");
const resultCounter = document.querySelector("#resultCounter");

// Modal DOM Elements
const courseModal = document.getElementById("courseModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const enrollModalBtn = document.getElementById("enrollModalBtn");
const modalImage = document.getElementById("modalImage");
const modalCategory = document.getElementById("modalCategory");
const modalLevel = document.getElementById("modalLevel");
const modalDuration = document.getElementById("modalDuration");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");

// ============================================================================
// 3. CORE FUNCTIONS (Section 4C: Reusable Functions)
// ============================================================================

/**
 * Function 1: displayCourses()
 * Dynamically creates and injects course cards into the DOM.
 */
function displayCourses(courseList) {
  // Clear existing cards
  courseContainer.innerHTML = "";

  // Update live result counter
  const totalCount = courses.length;
  const currentCount = courseList.length;
  resultCounter.textContent = `Showing ${currentCount} of ${totalCount} courses`;

  // Handle No Results state (Section 3G)
  if (currentCount === 0) {
    courseContainer.classList.add("hidden");
    noResultsMessage.classList.remove("hidden");
    return;
  }

  courseContainer.classList.remove("hidden");
  noResultsMessage.classList.add("hidden");

  // Loop through courses and create elements dynamically
  courseList.forEach((course) => {
    const card = document.createElement("article");
    card.className = "course-card";

    const levelBadgeClass = course.level.toLowerCase();
    const featuredTag = course.featured
      ? `<span class="featured-ribbon">Featured</span>`
      : "";

    card.innerHTML = `
      <div class="card-thumb-wrapper">
        <img src="${course.image}" alt="${course.title}" class="card-thumb" loading="lazy">
        ${featuredTag}
      </div>
      <div class="card-content">
        <div class="card-badges">
          <span class="badge-category">${course.category}</span>
          <span class="badge-level ${levelBadgeClass}">${course.level}</span>
        </div>
        <h2 class="card-title">${course.title}</h2>
        <p class="card-description">${course.description}</p>
        <div class="card-footer">
          <span class="duration-label">⏱ ${course.duration}</span>
          <button type="button" class="btn-details" data-id="${course.id}">View Details</button>
        </div>
      </div>
    `;

    // Add event listener to "View Details" button for Popup Modal
    const detailsBtn = card.querySelector(".btn-details");
    detailsBtn.addEventListener("click", () => openCourseModal(course));

    courseContainer.appendChild(card);
  });
}

/**
 * Function 2: searchCourses()
 * Checks if a course matches the search keyword (case-insensitive, partial match).
 */
function searchCourses(courseList, keyword) {
  const cleanKeyword = keyword.trim().toLowerCase();
  if (!cleanKeyword) {
    return courseList;
  }

  return courseList.filter((course) => {
    const titleMatch = course.title.toLowerCase().includes(cleanKeyword);
    const descMatch = course.description.toLowerCase().includes(cleanKeyword);
    const categoryMatch = course.category.toLowerCase().includes(cleanKeyword);
    return titleMatch || descMatch || categoryMatch;
  });
}

/**
 * Function 3: filterCourses()
 * Combines search input, category dropdown, difficulty level dropdown, and sorting.
 * Fulfils Section 3E: Combined Search & Filtering.
 */
function filterCourses() {
  const searchQuery = searchInput.value;
  const selectedCategory = categoryFilter.value;
  const selectedLevel = levelFilter.value;
  const selectedSort = sortSelect.value;

  // Step A: Filter by search keyword using searchCourses()
  let filteredResults = searchCourses(courses, searchQuery);

  // Step B: Filter by selected Category
  if (selectedCategory !== "All Categories") {
    filteredResults = filteredResults.filter(
      (course) => course.category === selectedCategory
    );
  }

  // Step C: Filter by selected Difficulty Level
  if (selectedLevel !== "All Levels") {
    filteredResults = filteredResults.filter(
      (course) => course.level === selectedLevel
    );
  }

  // Step D: Optional Challenge - Sort results
  const sortedResults = [...filteredResults];
  if (selectedSort === "title-asc") {
    sortedResults.sort((a, b) => a.title.localeCompare(b.title));
  } else if (selectedSort === "title-desc") {
    sortedResults.sort((a, b) => b.title.localeCompare(a.title));
  } else if (selectedSort === "duration-asc") {
    sortedResults.sort((a, b) => a.weeks - b.weeks);
  } else if (selectedSort === "duration-desc") {
    sortedResults.sort((a, b) => b.weeks - a.weeks);
  }

  // Render final matched courses
  displayCourses(sortedResults);
}

/**
 * Function 4: clearFilters()
 * Resets search input, dropdowns, and displays all available courses again (Section 3F).
 */
function clearFilters() {
  searchInput.value = "";
  categoryFilter.value = "All Categories";
  levelFilter.value = "All Levels";
  sortSelect.value = "default";

  displayCourses(courses);
}

/**
 * Bonus Function: openCourseModal()
 * Opens the course details popup when a user clicks "View Details".
 */
function openCourseModal(course) {
  modalImage.src = course.image;
  modalImage.alt = course.title;
  modalCategory.textContent = course.category;
  modalLevel.textContent = course.level;
  modalLevel.className = `badge-level ${course.level.toLowerCase()}`;
  modalDuration.textContent = `⏱ ${course.duration}`;
  modalTitle.textContent = course.title;
  modalDescription.textContent = course.description;

  courseModal.classList.remove("hidden");
}

function closeCourseModal() {
  courseModal.classList.add("hidden");
}

// ============================================================================
// 4. EVENT LISTENERS (Section 4D: Interactive Events)
// ============================================================================

// Search bar real-time input event
searchInput.addEventListener("input", filterCourses);

// Category & Difficulty dropdown change events
categoryFilter.addEventListener("change", filterCourses);
levelFilter.addEventListener("change", filterCourses);
sortSelect.addEventListener("change", filterCourses);

// Reset / Clear filter buttons click events
resetBtn.addEventListener("click", clearFilters);
showAllBtn.addEventListener("click", clearFilters);

// Modal close events
closeModalBtn.addEventListener("click", closeCourseModal);
enrollModalBtn.addEventListener("click", () => {
  alert(`Successfully registered interest for: ${modalTitle.textContent}!`);
  closeCourseModal();
});
courseModal.addEventListener("click", (event) => {
  if (event.target === courseModal) {
    closeCourseModal();
  }
});

// ============================================================================
// 5. INITIALIZATION ON PAGE LOAD
// ============================================================================
document.addEventListener("DOMContentLoaded", () => {
  displayCourses(courses);
});
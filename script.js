
function createElement(tag, className) {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

function formatTime(time){
    return time < 10 ? `0${time}` : time;
}

function countDown(eventDate,eventClosedDate,wrapper,injectIn){
    const parentDiv = document.querySelector(injectIn);
    const now = new Date();
    if(eventDate>eventClosedDate){
        console.error("Event date should be less than event closed date");
        parentDiv.textContent = "Error: Event date should be less than event closed date";
        return
    }
    const timeLeft = eventDate - now;
    const timeLeftClosed = eventClosedDate - now;

    if(timeLeft>=0){
        let days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        let hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        const values = [days,hours,minutes,seconds];
        values.forEach((value,index)=>{
            values[index] = formatTime(value);
        });

        parentDiv.innerHTML = `
        <div class="counter-value-column">
            <span class="countdown-value">${values[0]}</span>
            <span class="countdown-label">${values[0]>1?'Days':'Day'}</span>
        </div>
        <div class="counter-value-column">
            <span class="countdown-value">${values[1]}</span>
            <span class="countdown-label">${values[1]>1?'Hours':'Hour'}</span>
        </div>
        <div class="counter-value-column">
            <span class="countdown-value">${values[2]}</span>
            <span class="countdown-label">${values[2]>1?'Minutes':'Minute'}</span>
        </div>
        <div class="counter-value-column">
            <span class="countdown-value">${values[3]}</span>
            <span class="countdown-label">${values[3]?'Seconds':'Second'}</span>
        </div>
        `;

    }else{
        
        if(timeLeftClosed<=0){
            parentDiv.innerHTML = "<p>Event is closed!</p>";
        }else{
            parentDiv.innerHTML = "<p>Happening Now!</p>";
        }
    }
    
}
function renderSponsered(sponsered){
    const parent = document.getElementById("sponsered-wrapper");
    const elements = [];
    for (let index = 0; index < sponsered.length; index++) {
        const sponser =` 
         <a class="fade-in" href="${sponsered[index].link}">
            <figure>
                <img loading="lazy" class="sponsered-img" src="${sponsered[index].image}" alt="${sponsered[index].title}">
          
            </figure>
        </a>
        `;

        elements.push(sponser);
    }
    // Append each event to the parent element
    elements.forEach(sponserHTML => {
        const tempDiv = document.createElement("div"); // Create a temporary div
        tempDiv.innerHTML = sponserHTML; // Set inner HTML
        parent.appendChild(tempDiv); // Append the first child (the event element)
    });



}




function createCounter(eventDate,eventClosedDate,wrapper,injectIn){
    setInterval(() => {
        countDown(eventDate,eventClosedDate,wrapper,injectIn);
    }, 1000);
}

function eventsRender(title,data,counter_title="counter"){
    const parent = document.getElementById("events-wrapper");
    const titleElement = createElement("h2","events-title");
    titleElement.textContent = title
    parent.appendChild(titleElement);

    const elements = [];
    for (let i = 0; i < data.length; i++) {
        const isRegisterClosed = (new Date(data[i].registerenddate) - new Date())>0 ? false : true;
        try {
            const event =` 
            <div class="main-event-wrapper">
            <div class="event fade-in">
                <div class="image-wrapper">
                    <figure>
                        <img class="event-img" loading='lazy' src="${data[i].image}" alt="${data[i].title}">
                       
                    </figure>
                </div>
                <div class="other-event-details">
                 
                    <div class="event-title">
                        <h2 class="event-name">
                            ${data[i].title}
                        </h2>
                        <div class="counter-parent"><div class="${counter_title}${i} countdown-container-sm fade-in"></div></div>
                    </div>
                    <p class="event-description">
                        ${data[i].description}
                    </p>
                </div>
              
            </div>
            <div class="register-btn-parent-item">
            <div id="register-btn-wrapper-item">
            <a class="register-btn-sm" href="${isRegisterClosed?data[i].registerform:"#"}">${isRegisterClosed?'Register Now':'Register closed'}</a></div>
             </div>
            </div>
            `;
    
            elements.push(event);
        } catch (error) {
            console.error("Error: ",error);
        }
    }
     // Append each event to the parent element
     elements.forEach(eventHTML => {
        const tempDiv = document.createElement("div"); // Create a temporary div
        tempDiv.innerHTML = eventHTML; // Set inner HTML
        parent.appendChild(tempDiv); // Append the first child (the event element)
    });
    
}

function renderCounter(counter_title,data){
    for (let index = 0; index < data.length; index++) { 
        createCounter(new Date(data[index].date),new Date(data[index].closedDate),"ai-meet-counter",`.${counter_title}${index}`);
    }
}
// Function to handle scroll animation
const fadeInElements = () => {
    const elements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, { threshold: 0.5 }); // Adjust the threshold as needed

    elements.forEach(element => {
        observer.observe(element);
    });
};



document.addEventListener("DOMContentLoaded", () => {
        // Set the date we're counting down to
    const eventDate = new Date("Nov 15, 2024 00:00:00");
    const eventClosedDate = new Date("Nov 28, 2024 00:00:00");
    createCounter(eventDate,eventClosedDate,"ai-meet-counter",".ai-meet-counter");
 

    const pre_events = [
        {
            title: "Pre Event AI Meet 2024",
            date: "Nov 15, 2024 00:00:00",
            closedDate: "Nov 28, 2024 00:00:00",
            registerform: "https://docs.google.com/forms/d/e/1FAIpQLSf1Z9",
            registerenddate: "Nov 28, 2024 00:00:00",
            description: "AI Meet 2024 is a conference that brings together the brightest minds in AI from around the world. The conference will feature talks from leading experts in the field, as well as hands-on workshops and networking opportunities. Whether you're a seasoned AI professional or just starting out, AI Meet 2024 has something for everyone. Join us and be a part of the future of AI!",
            image: "https://i0.wp.com/aiclub.ku.edu.np/wp-content/uploads/2024/03/kuaic-logo-transparent-background.png?w=500&ssl=1"
        },
        {
            title: "Pre Event AI Meet 2025",
            date: "Nov 15, 2024 00:00:00",
            closedDate: "Nov 28, 2024 00:00:00",
            registerform: "https://docs.google.com/forms/d/e/1FAIpQLSf1Z9",
            registerenddate: "Aug 28, 2024 00:00:00",
            description: "AI Meet 2024 is a conference that brings together the brightest minds in AI from around the world. The conference will feature talks from leading experts in the field, as well as hands-on workshops and networking opportunities. Whether you're a seasoned AI professional or just starting out, AI Meet 2024 has something for everyone. Join us and be a part of the future of AI!",
            image: "https://i0.wp.com/aiclub.ku.edu.np/wp-content/uploads/2024/03/kuaic-logo-transparent-background.png?w=500&ssl=1"
        },
    ]
    const events = [
        {
            title: "AI Meet 2024",
            date: "Nov 15, 2024 00:00:00",
            closedDate: "Nov 28, 2024 00:00:00",
            registerform: "https://docs.google.com/forms/d/e/1FAIpQLSf1Z9",
            registerenddate: "Nov 28, 2024 00:00:00",
            description: "AI Meet 2024 is a conference that brings together the brightest minds in AI from around the world. The conference will feature talks from leading experts in the field, as well as hands-on workshops and networking opportunities. Whether you're a seasoned AI professional or just starting out, AI Meet 2024 has something for everyone. Join us and be a part of the future of AI!",
            image: "https://i0.wp.com/aiclub.ku.edu.np/wp-content/uploads/2024/03/kuaic-logo-transparent-background.png?w=500&ssl=1"
        },
        {
            title: "AI Meet 2025",
            date: "Nov 15, 2025 00:00:00",
            closedDate: "Nov 28, 2025 00:00:00",
            registerform: "https://docs.google.com/forms/d/e/1FAIpQLSf1Z9",
            register_end_date: "Nov 28, 2024 00:00:00",
            description: "AI Meet 2025 is a conference that brings together the brightest minds in AI from around the world. The conference will feature talks from leading experts in the field, as well as hands-on workshops and networking opportunities. Whether you're a seasoned AI professional or just starting out, AI Meet 2025 has something for everyone. Join us and be a part of the future of AI!",
            image: "https://i0.wp.com/aiclub.ku.edu.np/wp-content/uploads/2024/03/kuaic-logo-transparent-background.png?w=500&ssl=1"
        },
        {
            title: "AI Meet 2026",
            date: "Nov 15, 2026 00:00:00",
            closedDate: "Nov 28, 2026 00:00:00",   
            registerform: "https://docs.google.com/forms/d/e/1FAIpQLSf1Z9",
            registerenddate: "Nov 28, 2024 00:00:00",
            description: "AI Meet 2026 is a conference that brings together the brightest minds in AI from around the world. The conference will feature talks from leading experts in the field, as well as hands-on workshops and networking opportunities. Whether you're a seasoned AI professional or just starting out, AI Meet 2026 has something for everyone. Join us and be a part of the future of AI!",
            image: "https://i0.wp.com/aiclub.ku.edu.np/wp-content/uploads/2024/03/kuaic-logo-transparent-background.png?w=500&ssl=1"
        }
    ]
    
    const post_events = [
        {
            title: "AI Meet 2027",
            date: "Nov 15, 2027 00:00:00",
            closedDate: "Nov 28, 2027 00:00:00",
            description: "AI Meet 2027 is a conference that brings together the brightest minds in AI from around the world. The conference will feature talks from leading experts in the field, as well as hands-on workshops and networking opportunities. Whether you're a seasoned AI professional or just starting out, AI Meet 2027 has something for everyone. Join us and be a part of the future of AI!",
            image: "https://i0.wp.com/aiclub.ku.edu.np/wp-content/uploads/2024/03/kuaic-logo-transparent-background.png?w=500&ssl=1"
        },
        {
            title: "AI Meet 2028",
            date: "Nov 15, 2028 00:00:00",
            closedDate: "Nov 28, 2028 00:00:00",
            description: "AI Meet 2028 is a conference that brings together the brightest minds in AI from around the world. The conference will feature talks from leading experts in the field, as well as hands-on workshops and networking opportunities. Whether you're a seasoned AI professional or just starting out, AI Meet 2028 has something for everyone. Join us and be a part of the future of AI!",
            image: "https://i0.wp.com/aiclub.ku.edu.np/wp-content/uploads/2024/03/kuaic-logo-transparent-background.png?w=500&ssl=1"
        },
        {
            title: "AI Meet 2029",
            date: "Nov 15, 2029 00:00:00",
            closedDate: "Nov 28, 2029 00:00:00",
            description: "AI Meet 2029 is a conference that brings together the brightest minds in AI from around the world. The conference will feature talks from leading experts in the field, as well as hands-on workshops and networking opportunities. Whether you're a seasoned AI professional or just starting out, AI Meet 2029 has something for everyone. Join us and be a part of the future of AI!",
            image: "https://i0.wp.com/aiclub.ku.edu.np/wp-content/uploads/2024/03/kuaic-logo-transparent-background.png?w=500&ssl=1"  
        }
    ]
    
    eventsRender("Pre Events",pre_events,"prevent-counter");
    eventsRender("Main Events",events,"ai-meet-counter");
    eventsRender("Post Events",post_events,"post-event-counter");

    renderCounter("ai-meet-counter",events);
    renderCounter("prevent-counter",pre_events);
    renderCounter("post-event-counter",post_events);
    
    const sponsered = [
        {
            title: "Sponser 1",
            image: "https://i0.wp.com/aiclub.ku.edu.np/wp-content/uploads/2024/03/kuaic-logo-transparent-background.png?w=500&ssl=1",
            link: "#"
        },
        {
            title: "Sponser 2",
            image: "https://i0.wp.com/aiclub.ku.edu.np/wp-content/uploads/2024/03/kuaic-logo-transparent-background.png?w=500&ssl=1",
            link: "#"
        },
        
    ]
    renderSponsered(sponsered);
    fadeInElements ();

    
});



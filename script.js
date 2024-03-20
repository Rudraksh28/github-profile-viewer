document.addEventListener('DOMContentLoaded', function() {
    const icon = document.querySelector(".ri-sun-line");
    const para = document.querySelector(".p_demo");
    const body = document.querySelector("body");
    const textarea = document.querySelector("#textarea");
    const textareaClass = document.querySelector(".textarea");
    const mainBox = document.querySelector(".main_logic");
    const githubUrl = document.querySelector('.github_url a');
    const mainBox2 = document.querySelector(".box");
    const locationText = document.querySelector(".location p");
    const twitterText = document.querySelector(".twitter p");
    const websiteText = document.querySelector(".website a");
    const companyText = document.querySelector(".company a");
    const svgElements = document.querySelectorAll(".hero_1 svg, .hero_2 svg, .hero_3 svg, .hero_4 svg, .hero_5 svg");

    let flash = false;

    body.style.backgroundColor = "#f5f8ff";

    icon.addEventListener("click", () => {
        flash = !flash;
        if(flash) {
            // Dark mode styles
            para.innerHTML = "DARK";
            icon.innerHTML = "<i class='ri-sun-fill'></i>";
            icon.classList.remove("ri-sun-line");
            body.style.backgroundColor = "#141c2f";
            body.style.color = "#ffffff";
            textarea.style.backgroundColor = "#1e2b48";
            textarea.style.color = "#ffffff";
            textareaClass.style.backgroundColor = "#1e2b48";
            textareaClass.style.border = "4px solid #1e2b48";
            mainBox.style.backgroundColor = "#1e2b48";
            mainBox.style.color = "#ffffff";
            githubUrl.style.color = "#087fff";
            mainBox2.style.backgroundColor = "#141d2e";
            locationText.style.color = "#ffffff";
            twitterText.style.color = "#ffffff";
            websiteText.style.color = "#ffffff";
            companyText.style.color = "#ffffff";

            svgElements.forEach(svgElement => {
                svgElement.querySelectorAll('path').forEach(path => {
                    path.setAttribute('fill', '#ffffff'); 
                });
            });
        } else {
            // Light mode styles
            para.innerHTML = "LIGHT";
            icon.innerHTML = "<i class='ri-sun-line'></i>";
            icon.classList.remove("ri-sun-fill");
            body.style.backgroundColor = "#f5f8ff";
            body.style.color = "black";

            textarea.style.removeProperty('background-color');
            textarea.style.removeProperty('color');
            textareaClass.style.removeProperty('background-color');
            textareaClass.style.removeProperty('border');
            mainBox.style.removeProperty('background-color');
            mainBox.style.removeProperty('color');
            mainBox2.style.removeProperty('background-color');
            locationText.style.removeProperty('color');
            twitterText.style.removeProperty('color');
            websiteText.style.removeProperty('color');
            companyText.style.removeProperty('color');

            svgElements.forEach(svgElement => {
                svgElement.querySelectorAll('path').forEach(path => {
                    path.setAttribute('fill', '#4b699b'); 
                });
            });
        }
    });

    const button = document.querySelector(".search_button");
    button.addEventListener("click", CheckGithub);
});

async function CheckGithub() {
    const githubUserInput = document.querySelector("#textarea").value.trim();
    if (githubUserInput === '') {
        alert("Please enter a GitHub username");
    } else {
        await doSomething(githubUserInput);
    }
}

async function doSomething(githubUser) {
    try {
        const response = await fetch(`https://api.github.com/users/${githubUser}`);

        if (!response.ok) {
            if (response.status === 403) {
                throw new Error("Access to GitHub API forbidden. Please try again later.");
            } else {
                throw new Error("User not found");
            }
        }

        const data = await response.json();
        const imgIcon = document.querySelector('.img_icon img');
        imgIcon.src = data.avatar_url;
        imgIcon.alt = "GitHub Avatar";

        const joinedDate = new Date(data.created_at);
        const formattedJoinedDate = `Joined ${joinedDate.getDate()} ${getMonthName(joinedDate.getMonth())} ${joinedDate.getFullYear()}`;
        document.querySelector('.date h3').textContent = formattedJoinedDate;
        
        const githubName = document.querySelector('.github_name h2');
        const githubBio = document.querySelector('.github_bio p');
        const githubUrl = document.querySelector('.github_url a');
        const userLocation = document.querySelector('.location p');
        const twitterUser = document.querySelector('.twitter p');
        const githubWebsite = document.querySelector('.website a');
        const githubCompany = document.querySelector('.company a');
        const allH5Elements = document.querySelectorAll('.box2 h5');
        allH5Elements[0].textContent = `${data.public_repos}`;
        allH5Elements[1].textContent = `${data.followers}`;
        allH5Elements[2].textContent = `${data.following}`;
        githubUrl.href = data.html_url;
        githubUrl.textContent = `@${data.login}`;
        githubName.innerHTML = `${data.name || 'Not Available'}`;
        githubBio.innerHTML = `${data.bio || 'This user has no bio.'}`;
        userLocation.textContent = `${data.location || 'Not Available'}`;
        twitterUser.textContent = `${data.twitter_username || 'Not Available'}`;
        githubWebsite.href = `${data.blog || '#'}`;
        githubWebsite.textContent = `${data.blog ? data.blog : 'Not Available'}`;
        githubCompany.href = `${data.company || '#'}`;
        githubCompany.textContent = `${data.company ? data.company : 'Not Available'}`;

    } catch (error) {
        console.error(error.message);
        alert(error.message); // Display user-friendly error message
    }
}

function getMonthName(monthIndex) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[monthIndex];
}

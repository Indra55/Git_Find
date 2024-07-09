document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById("myform");
    var sound = document.getElementById('sound'); 
    var primaryButtonSound = document.getElementById("primary-button-sound");
    var secondaryButtonSound = document.getElementById("secondary-button-sound");

    // Function to truncate text to a specific number of words
    function truncateText(text, wordLimit) {
        const words = text.split(" ");
        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(" ") + "...";
        }
        return text;
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        var search = document.getElementById("search-input").value;
        var originalName = search.split(' ').join('');
        var wordLimit = 4; // Set your word limit here

        fetch("https://api.github.com/users/" + originalName)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('User not found');
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
                var profileForm = document.getElementById("profile-form");
                var truncatedBio = data.bio ? truncateText(data.bio, wordLimit) : 'N/A';

                profileForm.innerHTML = `
                    <div class="profile-content">
                        <img src="${data.avatar_url}" alt="Avatar" class="avatar">
                        <h2>${data.name}</h2>
                        <p><strong>Username:</strong> ${data.login}</p>
                        <p><strong>Bio:</strong> ${truncatedBio}</p>
                        <p><strong>Location:</strong> ${data.location ? data.location : 'N/A'}</p>
                        <p><strong>Public Repos:</strong> ${data.public_repos}</p>
                        <p><strong>Followers:</strong> ${data.followers}</p>
                        <p><strong>Following:</strong> ${data.following}</p>
                        <a href="${data.html_url}" target="_blank" class="btn btn-primary">View Profile on GitHub</a>
                        <button type="button" id="close-button" class="btn btn-secondary">Close</button>
                    </div>
                `;

                sound.play();
                document.querySelector('.btn-primary').addEventListener('click', function() {
                    primaryButtonSound.play();
                });

                document.querySelector('.btn-secondary').addEventListener('click', function() {
                    secondaryButtonSound.play();
                });

                document.getElementById('close-button').addEventListener('click', function(e) {
                    e.preventDefault(); 
                    profileForm.innerHTML = ''; 
                    document.getElementById("search-input").value = ''; 
                });
            })
            .catch((error) => {
                console.error('Error:', error);
                var profileForm = document.getElementById("profile-form");
                profileForm.innerHTML = `
                    <div class="profile-content">
                        <h2>User not found</h2>
                    </div>
                `;
                sound.play(); 
            });
    });
});

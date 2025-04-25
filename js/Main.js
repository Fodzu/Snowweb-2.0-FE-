document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.section-button');
    const container = document.querySelector('.container');
    const groupName = document.querySelector('.groupName');
    const aboutContent = document.querySelector('.groupAbout');
    const quotesContent = document.querySelector('#quotes-content');
    const highlightName = document.querySelector('.highlightName');

    function animateContent() {
        container.classList.remove('animate-in');
        void container.offsetWidth; // Force reflow to restart animation
        container.classList.add('animate-in');
    }

    buttons.forEach(button => {
        button.addEventListener('click', function (event) {
            event.preventDefault();

            buttons.forEach(btn => {
                btn.classList.remove('active');
                btn.classList.add('inactive');
            });
            this.classList.remove('inactive');
            this.classList.add('active');

            animateContent();

            aboutContent.classList.remove('show');
            quotesContent.classList.remove('show');
            groupName.classList.remove('show');

            setTimeout(() => {
                if (this.textContent.toUpperCase() === 'ABOUT') {
                    groupName.textContent = 'ABOUT ';
                    const snowflakeSpan = document.createElement('span');
                    snowflakeSpan.classList.add('highlightName');
                    snowflakeSpan.textContent = 'SNOWFLAKE';
                    groupName.appendChild(snowflakeSpan);

                    aboutContent.style.display = 'block';
                    quotesContent.style.display = 'none';

                    setTimeout(() => {
                        groupName.classList.add('show');
                        aboutContent.classList.add('show');
                    }, 10);

                } else if (this.textContent.toUpperCase() === 'QUOTES') {
                    groupName.textContent = 'QUOTES FROM ';
                    const snowflakeSpan = document.createElement('span');
                    snowflakeSpan.classList.add('highlightName');
                    snowflakeSpan.textContent = 'SNOWFLAKE';
                    groupName.appendChild(snowflakeSpan);

                    aboutContent.style.display = 'none';
                    quotesContent.style.display = 'block';

                    setTimeout(() => {
                        groupName.classList.add('show');
                        quotesContent.classList.add('show');
                    }, 10);
                }
            }, 200);
        });
    });

    // Initial load state
    const aboutButton = document.querySelector('.section-button[href="#about"]');
    if (aboutButton) {
        aboutButton.classList.add('active');
        aboutButton.classList.remove('inactive');
        groupName.textContent = 'ABOUT ';
        const snowflakeSpan = document.createElement('span');
        snowflakeSpan.classList.add('highlightName');
        snowflakeSpan.textContent = 'SNOWFLAKE';
        groupName.appendChild(snowflakeSpan);
        aboutContent.style.display = 'block';
        quotesContent.style.display = 'none';
        animateContent();

        setTimeout(() => {
            groupName.classList.add('show');
            aboutContent.classList.add('show');
        }, 10);
    }
});

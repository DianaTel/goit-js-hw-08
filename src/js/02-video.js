import throttle from 'lodash.throttle';

document.addEventListener('DOMContentLoaded', function() {
    const iframe = document.getElementById('vimeo-player'); 
    const player = new Vimeo.Player(iframe); 

    player.on('play', function() {
        console.log('played the video!');
    });

    player.getVideoTitle().then(function(title) {
        console.log('title:', title);
    });

    // player.on('timeupdate', function(data) {
    //     const currentTime = data.seconds;
    //     localStorage.setItem('videoplayer-current-time', currentTime);
    //     console.log('Current time:', currentTime);
    // });

    const updatePlaybackTime = throttle(function(data) {
        const currentTime = data.seconds;
        localStorage.setItem('videoplayer-current-time', currentTime);
        console.log('Current time:', currentTime);
    }, 1000);

    player.on('timeupdate', updatePlaybackTime);


    const savedTime = localStorage.getItem('videoplayer-current-time');
    if (savedTime !== null) {
        console.log('Saved time:', savedTime);

        player.setCurrentTime(parseFloat(savedTime)).then(function(seconds) {
            console.log('Seeked to:', seconds);
        }).catch(function(error) {
            switch (error.name) {
                case 'RangeError':
                    console.log('Time was out of range.');
                    break;
                default:
                    console.log('An error occurred while seeking.');
                    break;
            }
        });
    };

   
});


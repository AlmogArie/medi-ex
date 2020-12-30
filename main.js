'use strict'

const app = () => {
    const song = document.querySelector('.song');
    const play = document.querySelector('.play');
    const outline = document.querySelector('.moving-outline circle');
    const video = document.querySelector('.vid-container video');

    //Sounds
    const sounds = document.querySelectorAll('.sound-picker button');
    //Time Display
    const timeDisplay = document.querySelector('.time-display');
    const timeSelect = document.querySelectorAll('.time-select button')
    //Get the Lenght of the outline
    const outlineLength = outline.getTotalLength();
    console.log(outlineLength);

    //Duration
    let fakeDuration = 600;

    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;

    // Pick different sound
    sounds.forEach(sound => {
        sound.addEventListener('click', function () {
            song.src = this.getAttribute('data-sound')
            video.src = this.getAttribute('data-video')
            song.pause()
            play.src = './svg/play.svg'

        })
    });

    //Play sound
    play.addEventListener('click', () => {
        checkPlaying(song);
    });

    //Select sound
    timeSelect.forEach(option => {
        option.addEventListener('click', function () {
            fakeDuration = this.getAttribute('data-time');
            song.pause()
            song.currentTime = 0
            timeDisplay.textContent = `${Math.floor(fakeDuration/60)}:${Math.floor(fakeDuration%60)}0`
            console.log(timeDisplay.textContent);
            video.pause()
            play.src = './svg/play.svg'
        })
    });

    // function To play and stop the song
    const checkPlaying = song => {
        if (song.paused) {
            song.play();
            video.play()
            play.src = './svg/pause.svg'
        } else {
            song.pause()
            video.pause()
            play.src = './svg/play.svg'
        }
    };

    //we can animate the circle
    song.ontimeupdate = () => {
        let currentTime = song.currentTime;
        let elapsed = fakeDuration - currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);

        //Animate the circle
        let progress = outlineLength - (currentTime / fakeDuration) * outlineLength
        outline.style.strokeDashoffset = progress

        //Animate the time text
        console.log(timeDisplay.textContent);
        console.log(seconds);

        (seconds === 0) ? timeDisplay.textContent = `${minutes}:${seconds}0`: timeDisplay.textContent = `${minutes}:${seconds}`;
        if (currentTime >= fakeDuration) {
            song.pause();
            song.currentTime = 0;
            play.src = './svg/play.svg'
            video.pause()
        }
    }


}

app()
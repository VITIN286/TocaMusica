// Array de objetos para armazenar as informações das músicas
const musicas = [
    {
        title: 'Yellow',
        artist: 'Coldplay',
        path: 'musicas/yellow/yellow.mp3',
        cover: 'musicas/yellow/yellow.jpg'
    },
    {
        title: 'Paradise',
        artist: 'Coldplay',
        path: 'musicas/paradise/paradise.mp3',
        cover: 'musicas/paradise/paradise.jpg'
    },
    {
        title: 'Viva Lá Vida',
        artist: 'Coldplay',
        path: 'musicas/vivaLaVida/vivaLaVida.mp3',
        cover: 'musicas/vivaLaVida/vivaLaVida.jpg'
    },
    {
        title: 'A Sky Full Of Stars',
        artist: 'Coldplay',
        path: 'musicas/aSkyFull/aSkyFull.mp3',
        cover: 'musicas/aSkyFull/aSkyFull.jpg'
    },
    {
        title: 'Clocks',
        artist: 'Coldplay',
        path: 'musicas/clocks/clocks.mp3',
        cover: 'musicas/clocks/clocks.jpg'
    },
];

// Selecionando elementos do DOM
const player = document.querySelector('.player');
const coverImg = document.querySelector('.cover-img');
const songTitle = document.querySelector('.song-title');
const artistName = document.querySelector('.artist-name');
const audio = document.getElementById('audio');
const playPauseBtn = document.querySelector('.play-pause-btn');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const progressBar = document.querySelector('.progress-bar');
const progressContainer = document.querySelector('.progress-container');
const currentTimeEl = document.querySelector('.current-time');
const durationEl = document.querySelector('.duration');

// Variáveis de estado
let musicIndex = 0;
let isPlaying = false;

// Função para carregar a música
function loadMusic(musica) {
    coverImg.src = musica.cover;
    songTitle.innerText = musica.title;
    artistName.innerText = musica.artist;
    audio.src = musica.path;
    audio.play();
}

// Função para reproduzir a música
function playMusic() {
    isPlaying = true;
    audio.play();
    playPauseBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-pause"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>';
}

// Função para pausar a música
function pauseMusic() {
    isPlaying = false;
    audio.pause();
    playPauseBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-play"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>';
}

// Função para mudar a música (próxima)
function nextMusic() {
    musicIndex = (musicIndex + 1) % musicas.length;
    loadMusic(musicas[musicIndex]);
    playMusic();
}

// Função para mudar a música (anterior)
function prevMusic() {
    musicIndex = (musicIndex - 1 + musicas.length) % musicas.length;
    loadMusic(musicas[musicIndex]);
    playMusic();
}

// Função para formatar o tempo (0:00)
function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Função para atualizar a barra de progresso e o tempo
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    if (duration) {
        const progressPercent = (currentTime / duration) * 100;
        progressBar.style.width = `${progressPercent}%`;
        
        currentTimeEl.innerText = formatTime(currentTime);
        
        if (duration) {
            durationEl.innerText = formatTime(duration);
        }
    }
}

// Função para pular para uma parte da música
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

// Event Listeners
playPauseBtn.addEventListener('click', () => {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
});

prevBtn.addEventListener('click', prevMusic);
nextBtn.addEventListener('click', nextMusic);

audio.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);

// Tocar a próxima música quando a atual terminar
audio.addEventListener('ended', nextMusic);

// Carregar a primeira música ao iniciar a página
loadMusic(musicas[musicIndex]);

// Carregar a duração total da música quando o áudio estiver pronto
audio.addEventListener('loadedmetadata', () => {
    durationEl.innerText = formatTime(audio.duration);
});

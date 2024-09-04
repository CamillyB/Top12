document.addEventListener('DOMContentLoaded', function() {
    const audioPlayer = document.getElementById('audioPlayer');
    const musicaItems = document.querySelectorAll('.musica_item');
    const playPauseButton = document.getElementById('playPause');
    const prevTrackButton = document.getElementById('prevTrack');
    const nextTrackButton = document.getElementById('nextTrack');
    let currentTrackIndex = -1; // Índice da faixa atual

    // Função para atualizar o estado do botão Play/Pause
    function updatePlayPauseButton() {
        if (audioPlayer.paused) {
            playPauseButton.textContent = '▶';
        } else {
            playPauseButton.textContent = '||';
        }
    }

    // Função para tocar uma música
    function playMusic(item) {
        const audioSrc = item.getAttribute('data-audio');
        if (audioSrc) {
            audioPlayer.src = audioSrc;
            audioPlayer.style.display = 'block'; // Exibe o player de áudio
            audioPlayer.play();
            currentTrackIndex = Array.from(musicaItems).indexOf(item);
            document.querySelector('.audio-controls').style.display = 'block'; // Exibe os controles
            updatePlayPauseButton();
        }
    }

    musicaItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            playMusic(item);
        });
    });

    // Função para tocar ou pausar a música
    playPauseButton.addEventListener('click', function() {
        if (audioPlayer.paused) {
            audioPlayer.play();
        } else {
            audioPlayer.pause();
        }
        updatePlayPauseButton();
    });

    // Função para voltar à faixa anterior
    prevTrackButton.addEventListener('click', function() {
        if (currentTrackIndex > 0) {
            currentTrackIndex--;
            const prevTrack = musicaItems[currentTrackIndex];
            playMusic(prevTrack);
        }
    });

    // Função para avançar para a próxima faixa
    nextTrackButton.addEventListener('click', function() {
        if (currentTrackIndex < musicaItems.length - 1) {
            currentTrackIndex++;
            const nextTrack = musicaItems[currentTrackIndex];
            playMusic(nextTrack);
        }
    });

    // Atualiza o botão Play/Pause quando o áudio é pausado
    audioPlayer.addEventListener('pause', updatePlayPauseButton);
    audioPlayer.addEventListener('play', updatePlayPauseButton);
});

function searchMusic() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const musicItems = document.querySelectorAll('.musica_item');
    let found = false;

    // Itera sobre todos os itens de música
    musicItems.forEach(item => {
        const title = item.textContent.toLowerCase();
        if (title.includes(input)) {
            item.style.display = 'block';
            if (!found) {
                playMusic(item); // Toca a primeira música encontrada
                found = true;
            }
        } else {
            item.style.display = 'none';
        }
    });

    const audioPlayer = document.getElementById('audioPlayer');
    if (!found) {
        audioPlayer.style.display = 'none'; // Esconde o player se nenhuma música for encontrada
        alert('Nenhuma música encontrada.');
    } else {
        audioPlayer.style.display = 'block'; // Garante que o player esteja visível se uma música for encontrada
    }
}

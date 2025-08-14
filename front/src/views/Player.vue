<template>

    <Menu />

    <div class="main-container-player">
        <div class="audio-player">
            <!-- Capa -->
            <img :src="cover" alt="Capa do Áudio" class="cover" />

            <!-- Título -->
            <h3>{{ title }}</h3>

            <!-- Barra de progresso -->
            <input
            type="range"
            min="0"
            :max="duration"
            v-model="currentTime"
            @input="seekAudio"
            />
            <div class="time">
                <span>{{ formatTime(currentTime) }}</span>
                <span>{{ formatTime(duration - currentTime) }}</span>
            </div>

            <!-- Botões principais -->
            <div class="controls">
                <button @click="rewind"><span class="material-icons">replay_15</span></button>
                <button @click="togglePlay">
                    <span class="material-icons">{{ isPlaying ? 'pause' : 'play_arrow' }}</span>
                </button>
                <button @click="forward"><span class="material-icons">forward_15</span></button>
                <button @click="nextTrack"><span class="material-icons">skip_next</span></button>
            </div>

            <!-- Botões extras -->
            <div class="extra-controls">
                <button @click="changeSpeed">{{ speed }}x</button>
                <button @click="addBookmark"><span class="material-icons">bookmark</span></button>
            </div>

            <div class="change-view">
                <button @click="changeView">Change View</button>
            </div>

            <!-- Elemento de áudio -->
            <audio ref="audio" :src="audioSrc" @loadedmetadata="loadedMetadata" @timeupdate="updateTime"></audio>
        </div>
    </div>

</template>

<script>

import Menu from '@/components/Menu.vue';
import router from '@/router/index'


export default {
  name: "AudioPlayer",
  data() {
    return {
      audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      cover: "https://via.placeholder.com/200",
      title: "Capítulo 1 - Introdução",
      isPlaying: false,
      currentTime: 0,
      duration: 0,
      speed: 1.0,
      bookmarks: []
    };
  },
  setup(){
    

  },
  methods: {
    togglePlay() {
      const audio = this.$refs.audio;
      if (this.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      this.isPlaying = !this.isPlaying;
    },
    changeView(){
        router.push('/home')
    },
    forward() {
      this.$refs.audio.currentTime += 15;
    },
    rewind() {
      this.$refs.audio.currentTime -= 15;
    },
    nextTrack() {
      alert("Próxima faixa");
    },
    loadedMetadata() {
      this.duration = this.$refs.audio.duration;
    },
    updateTime() {
      this.currentTime = this.$refs.audio.currentTime;
    },
    seekAudio() {
      this.$refs.audio.currentTime = this.currentTime;
    },
    formatTime(seconds) {
      const m = Math.floor(seconds / 60);
      const s = Math.floor(seconds % 60);
      return `${m}:${s < 10 ? "0" + s : s}`;
    },
    changeSpeed() {
      if (this.speed === 1.0) this.speed = 1.5;
      else if (this.speed === 1.5) this.speed = 2.0;
      else this.speed = 1.0;
      this.$refs.audio.playbackRate = this.speed;
    },
    addBookmark() {
      this.bookmarks.push(this.currentTime);
      alert(`Marcador adicionado no tempo: ${this.formatTime(this.currentTime)}`);
    },
    
  },
  components: { Menu }
};

</script>

<style>

@import url('https://fonts.googleapis.com/icon?family=Material+Icons');

.audio-player {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
}

.cover {
  width: 200px;
  height: 200px;
  object-fit: cover;
}

.controls, .extra-controls {
  display: flex;
  gap: 18px;
  margin-top: 10px;
}

span{
    max-width: 24px;
}

.main-container-player > button {
  background: #eee;
  border: none;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  height: 50px;
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}

input[type="range"] {
  width: 35%;
}

.time {
  display: flex;
  justify-content: space-between;
  width: 35%;
  font-size: 0.9em;
  margin-top: 5px;
}
.audio-player > h3{
    margin-bottom: 3rem;
}

.main-container-player{
    width: 100%;
}

.change-view{
    display: flex;
    justify-content: flex-end;
    width: 90%;
}

</style>
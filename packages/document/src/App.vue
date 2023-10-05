
<script setup lang="ts">
import CKEditor from '@ckeditor/ckeditor5-vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import { useCounterStore } from "./stores/index"
import { storeToRefs } from 'pinia'
import { ref, computed, watch } from 'vue'

const store = useCounterStore()
const { count, doubleCount } = storeToRefs(store)
const { increment } = store


const obj = ref({
  nested: { count: { test: 0 } },
  arr: ['foo', 'bar']
})

setTimeout(() => {
  obj.value.arr[0] = "test"
  obj.value.nested.count.test = 20
}, 3000)

const isTrue = computed(() => {
  return obj.value.arr[0] === "test" ? 'yes' : 'false'
})

const ckeditor = ref(CKEditor.component) 

const answer = ref('666');

watch(() => obj.value.arr[0], () => {
  answer.value = 'wow'
})

const editorData = ref('<p>Content of the editor.</p>')
const editorConfig = ref({})

</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
    <div class="wrapper">
      <ckeditor :editor="ClassicEditor" v-model="editorData" :config="editorConfig"></ckeditor>
      <div>{{ answer }}</div>
      <div>
        <div>{{ isTrue }}</div>
      </div>
      <div>
        {{ obj.nested.count.test }}
      </div>
      <div>
        <div v-for="item in obj.arr">{{ item }}</div>
      </div>
      <HelloWorld msg="You did it!" />
      <div @click="increment">{{ count }}</div>
      <div>{{ doubleCount }}</div>
    </div>
  </header>
  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>

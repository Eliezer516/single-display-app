<script>
  import { goto } from '$app/navigation'
  import { deserialize } from '$app/forms'

  let selectedFile
  let fileUrl

  function handleFileInput(event) {
    const file = event.target.files[0];

    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()

      reader.onload = (e) => {
        fileUrl = e.target.result
      }

      reader.readAsDataURL(file)
      selectedFile = file;
    } else {
      selectedFile = null;
    }
  }

  async function handleSubmit(event) {
    if (selectedFile) {
      const formData = new FormData()
      formData.append('media', selectedFile)

      const response = await fetch(event.currentTarget.action, {
        method: 'POST',
        body: formData
      })
      const data = deserialize(await response.text())
      if (data.type === 'success') {
        goto(`/${data.data.id}`)
      }
    }
  }
</script>

<article>
  <header>
    <h1>Single Display App</h1>
  </header>
  {#if fileUrl}
    <img src={fileUrl} alt="">
  {:else}
    <label for="media">Agregar imagen</label>
  {/if}
  <footer>
    <form method="POST" on:submit|preventDefault={handleSubmit}>
      <input type="file" id="media" name="media" on:change={handleFileInput} />
      <button>Enviar</button>
    </form>
  </footer>
</article>


<style>
  #media {
    display: none;
  }

  article {
    max-width: 600px;
    margin: 0 auto;
  }

  label {
    width: 100%;
    height: 500px;
    display: grid;
    place-items: center;
    border: 10px dashed  gray;
    border-radius: 20px;
  }

  header {
    text-align: center;
  }

  form {
    display: grid;
    place-items: center;
  }

  button {
    width: 95%;
  }
</style>
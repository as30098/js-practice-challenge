const travelerImage = document.querySelector('img')
const travelerName = document.querySelector('h2')
const travelerNickname = document.querySelector('em')
const travelerLikes = document.querySelector('.likes')
const animalList = document.querySelector('#animals')
const animalForm = document.querySelector('#new-animal-sighting-form')
const likeButton = document.querySelector('.like-button')
const raffy = document.querySelector('#profile')


const getAllAnimals = () => {
  fetch(`http://localhost:3000/animalSightings`)
  .then(res => res.json())
  .then((animalArray) => {
    animalArray.forEach((animalObj) => {
      renderAnimal(animalObj)
    })
  })
}

const getRaffy = () => {
  fetch(`http://localhost:3000/travelers/1`)
  .then(res => res.json())
  .then((raffyObj) => {
    renderRaffy(raffyObj)
  })
}

const renderRaffy = (raffyObj) => {
    travelerImage.src = raffyObj.photo
    travelerImage.alt = raffyObj.name
    travelerName.innerText = raffyObj.name
    travelerNickname.innerText = raffyObj.nickname
    travelerLikes.innerText = raffyObj.likes
    travelerLikes.dataset.id = raffyObj.id
    travelerLikes.dataset.likes = raffyObj.likes

    likeButton.addEventListener('click', (e) => {

      let newLikeCount = raffyObj.likes + 1

      fetch(`http://localhost:3000/travelers/1`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          likes: newLikeCount
        })
      })
      .then(res => res.json())
      .then((updatedRaffyObj) => {
        // update the DOM
        travelerLikes.innerText = updatedRaffyObj.likes
        // update the object in memory
        raffyObj.likes = updatedRaffyObj.likes
      })
    })

}



const renderAnimal = (animalObj) => {
  const animalLi = document.createElement('li')

  const animalSpecies = document.createElement('p')
  animalSpecies.innerText = animalObj.species

  const animalPhoto = document.createElement('img')
  animalPhoto.src = animalObj.photo

  const animalLink = document.createElement('p')
  animalLink.innerText = animalObj.link

  const animalDescription = document.createElement('p')
  animalDescription.innerText = animalObj.description

  animalLi.append(animalSpecies, animalPhoto, animalLink, animalDescription)

  animalList.append(animalLi)

}


animalForm.addEventListener('submit', (e) => {

  e.preventDefault()

  fetch(`http://localhost:3000/animalSightings`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      travelerId: 1,
      species: e.target.species.value,
      photo: e.target.photo.value,
      link: e.target.link.value,
      description: e.target.description.value
    })
  })
  .then(res => res.json())
  .then((newAnimalObj) => {
    // update DOM
    renderAnimal(newAnimalObj)
    // update memory

  })
})


getAllAnimals()
getRaffy()
renderRaffy()

const kidsCard = async (searchText) => {

    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchText}`)
    const data = await res.json()
    const post = data.posts
    showCard(post)
    lastestPost()
   
   
}
const showCard = post => {

    const cardDiv = document.getElementById('show-card')
    cardDiv.textContent = ''
    post.forEach(posts => {
        let indicator = ''
        if(posts.isActive){
          indicator=`  <span id = "indicator" class="indicator-item badge badge-success"></span> `
        }
        else if(posts.isActive == false){
            indicator=`  <span id = "indicator" class="indicator-item badge badge-error"></span> `
        }

        // console.log(posts)
        // console.log( posts)


        const div = document.createElement('div')
        div.innerHTML = `
    <div class="flex gap-8 font-mulish rounded-3xl bg-[#F3F3F5] p-5">
    <div class="indicator">
    ${indicator}
    <div class="grid w-20 h-20  rounded-full bg-base-300 place-items-center"><i class="fa-regular fa-flag"></i></div>
  </div>
    
    <div>
         <div class="flex gap-6 mb-3">
             <h1 class="text-lg text-[#12132DCC] font-medium"># ${posts.category} </h1>
             <h1 class="text-lg text-[#12132DCC] font-medium">Author : <span> ${posts.author.name} </span>  </h1>
         </div>
         <div>
             <h1 class="font-bold text-2xl text-[#12132D] mb-2"> ${posts.title} </h1>
             <p class="font-normal text-lg"> ${posts.description} </p>
         </div>
         <div class="divider"></div>
         <div class="flex justify-between gap-5">
             <span><i class="fa-regular fa-message"></i> ${posts.comment_count} </span>
             <span><i class="fa-regular fa-eye"></i> ${posts.view_count} </span>
             <span><i class="fa-regular fa-clock"></i> ${posts.posted_time} </span>
             <div>
                 <span  onclick="mail( ${posts.id})" ><i class="fa-solid fa-envelope" style="color: #63E6BE;"></i></span>
             </div>
         </div>

    </div>

    `
        cardDiv.appendChild(div)

        
        
    });
   loadingSpiner(false)
}
const Search = () => {
    loadingSpiner(true)
    const value = document.getElementById('text-here').value;
    console.log(value)
    kidsCard(value)
    if (value) {
        kidsCard(value)
    }


}

const loadingSpiner = (isLoding) => {
    const spiner = document.getElementById('loading-spinner')
    if (isLoding) {
        spiner.classList.remove('hidden')
    }
    else {
        spiner.classList.add('hidden')
    }
}
let number = 0;
let sum = 1;
const mail = async ( id) => {
   
   
  const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts`)
  const data = await res.json()
  const posts = data.posts
 
  
  posts.forEach(post=>{
    
       
    const viewID = post.id
 
    
    if(viewID ==id){
      const Count = document.getElementById('count')
      Count.innerText = number +sum;
      sum++
        
         const title = document.getElementById('title-container')
       const div = document.createElement('div')

     div.innerHTML = `
     <div class="grid  grid-cols-2 text-center rounded-3xl bg-gray-300 p-2 mt-5">
     <h1 class="text-lg font-semibold"> ${post.title} </h1> 
   <div class="font-semibold text-lg"> <span><i class="fa-regular fa-eye"></i> ${post.view_count} </span></div>
   </div>
     `
     title.appendChild(div)
    }
    
   }) 

    
   
}

const lastestPost = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts')
    const data = await res.json();

    data.forEach(data => {

        const latestPart = document.getElementById('latest-post')
        const div = document.createElement('div')
        div.innerHTML = `
        <div class="card  bg-gray-100 shadow-xl">
        <figure class="px-10 pt-10">
          <img src=" ${data.cover_image} " alt="" class="rounded-xl" />
        </figure>
      
            

       
        <div class="card-body  ">
            <div class="flex gap-3">
                <span><i class="fa-regular fa-calendar-minus"></i></span>
                <span class="flex gap-3">${data.author?.posted_date || 'Not Published'} </span>
            </div>
          <h2 class="card-title font-mulish font-extrabold text-lg"> ${data.title} </h2>
          <p class="font-normal text-lg text-[#12132D99]"> ${data.description} </p>
          <div class="flex gap-3">
            <img class="size-11" src=" ${data.profile_image} " alt="">
            <div>
                <p class="text-xl font-bold"> ${data.author.name} </p>
                <p> ${data.author?.designation || "Unknown"} </p>
            </div>
        </div>

         
        </div>
      </div>
        `
        latestPart.appendChild(div)
    })



}

kidsCard("comedy")

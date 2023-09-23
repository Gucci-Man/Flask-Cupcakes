$("form").submit(function(evt){
    alert("submitted")

    evt.preventDefault();

    var flavor = $('#flavor').val();
    var size = $('#size').val();
    var rating = $('#rating').val()
    var image = $('#image').val()

    addCupcake(flavor, size, rating, image)

})

async function addCupcake(flavor,size,rating,image) {
    const res = await axios({
        url: '/api/cupcakes', 
        method: "POST",
        data: {flavor : flavor,
             size: size, 
             rating: rating, 
             image: image}})

    let newCupcake = $(generateCupcakeHTML(res.data.cupcake));
    $('.list-group').append(newCupcake)
    $("form").trigger("reset")
}

function generateCupcakeHTML(cupcake) {
    return `<li class="list-group-item d-flex justify-content-between align-items-center">Flavor: ${cupcake.flavor}<br>
    Size: ${cupcake.size}<br>
    Rating: ${cupcake.rating}<br>
    <img src="${cupcake.image}" alt="cupcake image" width="150" height="150"></li>`
}

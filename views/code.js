$("ul").on("click",".remove-pokemon",remove_item_f);

let list_item = document.getElementById("list_pokemon");

let get_element_li  = (datos_p) => {
  return `<li class="added-pokemon" style="list-style-type:none;border-style:solid;width: 15%;">
  ID: ${datos_p['ID']} <br/>
  name: ${datos_p['NAME']}<br/>
  <div class="weight">weight: ${datos_p['WEIGHT']}</div>
  <div>Height: ${datos_p['HIGHT']} </div>
  <div>Base experience: ${datos_p['BASE_EXP']}</div>
  <div><img src=${datos_p['IMG']} alt="pokemon"></div>
  <div>Types: ${datos_p['TYPES']}</div><br>
  <button class="remove-pokemon">remove</button>
  </li><br>`
}

let catchable_handle_for_the_error_of_the_pokemon_request = (err) => {
  //handle here the pokemon error from the request
  alert('ERROR!!! pokemon not found ');
}

function remove_item_f(e){
  //e.preventDefault();
  $(this).parent().remove();
}

let get_pokemon_data = (idPokemon) => {
  return new Promise((resolve, reject) => {
    // add the logic of the request here
    let responde  = new XMLHttpRequest();
    responde.open("GET", `https://pokeapi.co/api/v2/pokemon/${idPokemon}`, true);

    responde.onreadystatechange = (req_event) =>{
      if(responde.readyState == 4){
        if(responde.status == 200){
            return resolve(responde.response);
        }else{
          return reject(responde.reject);
        }
      }
    };
      responde.send(null);
  });
};

function get_pokemon(idPokemon){
    let promise = (result) =>{
    //recojemos lo que se pide
    result = JSON.parse(result);
    let list_types =[]
    let weight = result.weight;
    let imga = result.sprites.front_default;
    let name_Pokemon = result.name;
    let base_exp = result.base_experience;
    let typesData = result.types;
    // result.data.types.forEach((typesData)=>{
    //   typeName.push(typesData.type.name)
    // });
    // for (var i = 1; i <= typesData; i++) {
    //   typeNames.push(typesData[i].type['name']);
    // }
    // console.log(typeNames);
    for (var i = 0; i < typesData.length; i++) {
      list_types.push(typesData[i].type.name);
    }
    let pokemon_data = {
      'ID':result.id,
      'WEIGHT':weight,
      'NAME':name_Pokemon,
      'IMG': imga,
      'HIGHT':result.height,
      'BASE_EXP':base_exp,
      'TYPES':list_types
    }

        //send data
    datos = get_element_li(pokemon_data);
    let acumulado = list_item.innerHTML;
    list_item.innerHTML = acumulado + datos;
    //total1 = total1 + parseFloat(weight);
    return result
    //regresa la promesa
  };
  get_pokemon_data(idPokemon).then(promise).catch((err) =>{
    catchable_handle_for_the_error_of_the_pokemon_request(false);
    return err;
  });
}

document.addEventListener("DOMContentLoaded", function (event) {
  document.getElementById('add-item').addEventListener("click", (event) => {
    nameOfPok = document.getElementById('pokemon-name')
    .value.trim().toLowerCase();
    get_pokemon(nameOfPok, get_pokemon_data);
  });
});




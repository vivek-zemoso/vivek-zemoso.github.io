import submitForm, { checkFormValidation } from './validation.mjs';

let form = document.getElementById('addPhoto-form');
let feild_name = document.getElementById('name');
let feild_url = document.getElementById('url');
let feild_info = document.getElementById('info');
let feild_date = document.getElementById('date');
let feilds = [feild_name, feild_url, feild_info, feild_date];

feild_date.max = new Date().toISOString().split("T")[0];

const server_url = 'http://localhost:5000';
// const server_url = 'https://my-json-server.typicode.com/vivek-zemoso/fakeserver';
let method = 'POST';
let feild_id = -1;

const fetchImages = async () => {
    const response = await fetch(`${server_url}/images`);
    const images = await response.json();
    console.log(images);
    return images;
}

const postNewImage = async () => {
    const images = await fetchImages();
    const imageObj = {
        "id": (images.length + 1) * 10,
        "name": feild_name.value,
        "url": feild_url.value,
        "info": feild_info.value,
        "date": feild_date.value
    }

    const config = {
        method: method,
        body: JSON.stringify(imageObj),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*'
        }
    }

    const request_url = method === 'POST' ? `${server_url}/images` : `${server_url}/images/${feild_id}`;
    const res = await fetch(request_url, config);
    const data = await res.json();
    // console.log(`${{ SERVER_URL }}`);
    return data;
}


const clearFormData = async () => {
    const config = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*'
        }
    }
    await fetch(`${server_url}/forms/${feild_id}`, config);
}

checkFormValidation(feilds);
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let res = submitForm(feilds);
    if (res) {
        await postNewImage();
        await clearFormData();
        window.location.href = "../gallery.html";
    }
});

const prePopulateForm = async () => {
    let data = await fetch(`${server_url}/forms`);
    if (data.status === 200) {
        data = await data.json();
        feild_name.value = data[0].name;
        feild_url.value = data[0].url;
        feild_info.value = data[0].info;
        feild_date.value = data[0].date;
        feild_id = data[0].id;
        method = 'PUT';
    }
}

prePopulateForm();

export default fetchImages;
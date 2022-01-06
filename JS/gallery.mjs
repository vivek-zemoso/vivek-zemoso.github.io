const server_url = 'http://localhost:5000';
// const server_url = 'https://my-json-server.typicode.com/vivek-zemoso/fakeserver';

const fetchImages = async () => {
    const response = await fetch(`${server_url}/images`);
    const images = await response.json();
    return images;
}

const editImage = async (data) => {
    const config = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*'
        }
    }
    const res = await fetch(`${server_url}/forms`, config);
    console.log(await res.json());
}

const deleteImage = async (id) => {
    const response = await fetch(`${server_url}/images/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*'
        }
    });
    const images = await response.json();
    console.log(images);
}

const addImages = async () => {

    const images = await fetchImages();

    const row = document.getElementsByClassName('image-wrapper-row')[0];

    images.forEach(image => {
        const column = document.createElement('div');
        column.classList.add('image-wrapper-col');

        const img = document.createElement('img');
        img.src = image.url;
        img.alt = image.name;

        const button_grp = document.createElement('div');
        button_grp.classList.add('buttons');

        const edit_button = document.createElement('button');
        edit_button.classList.add('theme-bw');
        edit_button.innerHTML = "Edit";
        edit_button.addEventListener('click', async () => {
            await editImage(image);
            window.location.href = '../addImage.html';
        });

        const delete_button = document.createElement('button');
        delete_button.classList.add('invert-theme-bw');
        delete_button.innerHTML = "Delete";
        delete_button.addEventListener('click', async () => {
            let ans = prompt('Are you sure ? Type \'yes\' to delete !');
            console.log(ans);
            if (ans === 'yes') {
                await deleteImage(image.id);
                document.location.reload(true);
            }
        });

        button_grp.appendChild(edit_button);
        button_grp.appendChild(delete_button);

        column.appendChild(img);
        column.appendChild(button_grp);

        row.appendChild(column);
    });
}

addImages();
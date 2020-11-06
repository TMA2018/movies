/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';

document.addEventListener ('DOMContentLoaded', () => {
    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против...",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };

    const 
        promoGenre = document.querySelector('.promo__genre'),
        adv = document.querySelectorAll('.promo__adv img'),
        promoBg = document.querySelector('.promo__bg'),
        filmList = document.querySelector('.promo__interactive-list'),
        form = document.querySelector('.add'),
        //buskets = document.querySelectorAll('.delete'),
        btn = form.querySelector('button'),
        input = form.querySelector('.adding__input'),
        chk = form.querySelector('[type="checkbox"]');
    let buskets = document.querySelectorAll('.delete');
    // 1)
    const delAdv = (arr) => {
        arr.forEach(item => { 
            item.remove();
        });
    };

    let moviesList = movieDB.movies;
    //2)
    function changeName (name) {
        promoGenre.textContent = name;
    }
    //3)
    //4) 5)
    function createNewLists(list, parent) {
        parent.innerHTML = "";
        sortFilms(moviesList);
        for (let i=0; i < list.length; i++){
            list[i] = String(list[i]).toUpperCase();
        }
   
        list.forEach( (item, i) => {
            parent.innerHTML += ` 
            <li class="promo__interactive-item">${i+1}) ${item}
                <div class="delete"></div>
            </li>
        `;
        });
        buskets = document.querySelectorAll('.delete');
        for (let busket of buskets) {
            busket.addEventListener ('click', del);
        }
    }

    function sortFilms(moviesList) {
        let sortFilm =  moviesList.sort();
        //console.log(sortFilm);
        /*createNewLists -->
        filmList.innerHTML = "";

        sortFilm.forEach( (item, i) => {
                filmList.innerHTML += ` 
            <li class="promo__interactive-item">${i+1}) ${item}
                <div class="delete"></div>
            </li>
        `;
        });*/
        //createNewLists(sortFilm, filmList);    
        return sortFilms;
    }

    let add = function(e) {
        e.preventDefault();
        let a = input.value.toUpperCase();
        if (a) {
            if (a.length > 10) {
                a = `${a.slice(0, 10)}...`;
            } 
            moviesList.push(a);
        } else {
            alert ('write a real name');
        }
        sortFilms(moviesList);
        return moviesList;
    };

    function del (evt) {
    
        let delMovie = [];

        let txt = parseInt(evt.target.parentNode.textContent, 10);
        let j = 0;
        for (let i=0; i < moviesList.length; i++) {
            if (i+1 == txt) {
                evt.target.parentNode.remove();
                moviesList.splice(i, 1);
                continue;
            }
        }    
        createNewLists(moviesList, filmList);
        return moviesList;
    }
    
    chk.addEventListener('change', () => {
        if (chk.checked) {
            console.log('add lovest movie');
        } else {
            console.log('not add lovest movie');
        }
    });

    delAdv(adv);
    changeName('Drama');
    //sortFilms(moviesList); --> to create new list
    createNewLists(moviesList, filmList);
    promoBg.style.backgroundImage = "url(img/bg.jpg)";
    btn.addEventListener ('click',add);
});
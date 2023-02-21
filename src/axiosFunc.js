import axios from "axios";

export default class axiosFunc {

    constructor() {
        this.search = '',
        this.page = 1
    }

    fechArr() {
        return axios.get(`https://pixabay.com/api/?key=32993418-9f4f41ff9851a5ddec46140a8&q=${this.search}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}`)
        .then((data) => {
          return data
        })
    }

    incrementPage() {
        this.page += 1
    }

    resetPage() {
        this.page = 1
    }

    get quary() {
        return this.search
    }

    set quary(newQuary) {
        this.search = newQuary
    }
}
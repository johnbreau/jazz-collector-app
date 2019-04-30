const h = window.App.h;

class AppHome {
    render() {
        return [
            h("ion-header", null,
                h("ion-toolbar", { color: "primary" },
                    h("ion-title", null, "Home"))),
            h("ion-content", { padding: true },
                h("discogs-component", null))
        ];
    }
    static get is() { return "app-home"; }
    static get style() { return ""; }
}

class DiscogsComponent {
    constructor() {
        this.DISCOGS_BASE_API = 'https://api.discogs.com/artists/';
        // fetch('https://api.discogs.com/database/search?q=freddiehubbard&key=tFwRgMCrRNYihIsAemwL&secret=LQeRiRrauOFQaNtYgXhRCOXeotolHFNM&{?type,title,release_title,credit,artist,anv,label,genre,style,country,year,format,catno,barcode,track,submitter,contributor}')
        this.discogContent = [];
        this.maxValue = 5;
        this.value = 3;
    }
    // This will fire the getDiscogData mehtod onload...
    // componentWillLoad() {
    // this.getDiscogData();
    // this.queryDiscogs();
    // }
    handleSubmit(e) {
        e.preventDefault();
        // this.getDiscogData(this.artistId);
        this.queryDiscogs(this.queryTerm);
    }
    handleChange(event) {
        this.queryTerm = event.target.value;
    }
    getDiscogData(artistId) {
        fetch(this.DISCOGS_BASE_API + artistId)
            .then((response) => response.json())
            .then(response => {
            this.discogContent = response;
        });
    }
    queryDiscogs(queryTerm) {
        fetch('https://api.discogs.com/database/search?q=' + queryTerm + '&key=tFwRgMCrRNYihIsAemwL&secret=LQeRiRrauOFQaNtYgXhRCOXeotolHFNM&{?artist}')
            .then((response) => response.json())
            .then(response => {
            console.log(response);
            this.discogContent = response;
        });
    }
    render() {
        return (h("div", { padding: true },
            h("form", { onSubmit: (e) => this.handleSubmit(e) },
                h("label", { htmlFor: "artist-id" }, "Artist ID:"),
                h("input", { value: this.artistId, onInput: (event) => this.handleChange(event) })),
            h("div", null,
                h("h1", { class: "header-copy" }, this.discogContent.name)),
            h("div", { class: "bio-content" },
                h("p", { class: "body-copy" }, this.discogContent.profile))));
    }
    static get is() { return "discogs-component"; }
    static get properties() { return {
        "artistId": {
            "state": true
        },
        "discogContent": {
            "state": true
        },
        "maxValue": {
            "type": Number,
            "attr": "max-value"
        },
        "value": {
            "type": Number,
            "attr": "value"
        }
    }; }
    static get style() { return ".body-copy {\n  font-family: 'Roboto', sans-serif;\n  font-weight: 300;\n  font-size: 1rem;\n  line-height: 1.8rem;\n}\n\n.header-copy {\n  font-family: 'Roboto', sans-serif;\n  font-weight: 800;\n}"; }
}

export { AppHome, DiscogsComponent };
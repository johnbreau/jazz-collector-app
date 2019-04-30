import { Component, Prop, State } from '@stencil/core';

@Component({
  tag: 'discogs-component',
  styleUrl: 'discog-component.css'
})
export class DiscogsComponent {
  public DISCOGS_BASE_API= 'https://api.discogs.com/artists/';
  public queryTerm: string;
  // fetch('https://api.discogs.com/database/search?q=freddiehubbard&key=tFwRgMCrRNYihIsAemwL&secret=LQeRiRrauOFQaNtYgXhRCOXeotolHFNM&{?type,title,release_title,credit,artist,anv,label,genre,style,country,year,format,catno,barcode,track,submitter,contributor}')

  @State() discogContent: any = [];
  @State() artistId: number;
  @Prop() maxValue: number = 5;
  @Prop() value: number = 3;

  // This will fire the getDiscogData mehtod onload...
  // componentWillLoad() {
   // this.getDiscogData();
  // this.queryDiscogs();
  // }

  handleSubmit(e){
    e.preventDefault();
    // this.getDiscogData(this.artistId);
    this.queryDiscogs(this.queryTerm)
  }

  handleChange(event) {
    this.queryTerm = event.target.value;
  }

  getDiscogData(artistId){
    fetch(this.DISCOGS_BASE_API + artistId)
      .then((response: Response) => response.json())
      .then(response => {
        this.discogContent = response;
      });
  }

  queryDiscogs(queryTerm) {
    fetch('https://api.discogs.com/database/search?q=' + queryTerm + '&key=tFwRgMCrRNYihIsAemwL&secret=LQeRiRrauOFQaNtYgXhRCOXeotolHFNM&{?artist}')
      .then((response: Response) => response.json())
      .then(response => {
        console.log(response);
        this.discogContent = response;
      });
  }

  render() {
    return (
      <div padding>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <label htmlFor="artist-id">Artist ID:</label>
          <input value={this.artistId} onInput={(event) => this.handleChange(event)}/>
        </form>
        <div>
        <h1 class="header-copy">{this.discogContent.name}</h1>
        </div>
        <div class="bio-content">
          <p class="body-copy">{this.discogContent.profile}</p>
          {/*<img class="body-image" src="{ }"></img>*/}
          {/*<div>{this.discogContent.results[0]}</div>*/}
          {/*<img src={`(response.results[0]`}/>*/}
          </div>
      </div>
    );
  }
}


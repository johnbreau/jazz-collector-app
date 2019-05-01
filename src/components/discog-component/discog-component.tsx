import { Component, State } from '@stencil/core';

@Component({
  tag: 'discogs-component',
  styleUrl: 'discog-component.css'
})
export class DiscogsComponent {
  public DISCOGS_BASE_API= 'https://api.discogs.com/artists/';
  public queryTerm: string;
  // fetch('https://api.discogs.com/database/search?q=freddiehubbard&key=tFwRgMCrRNYihIsAemwL&secret=LQeRiRrauOFQaNtYgXhRCOXeotolHFNM&{?type,title,release_title,credit,artist,anv,label,genre,style,country,year,format,catno,barcode,track,submitter,contributor}')
  // Artist ids for testing...
  // 10079
  // 10620
  // 95088


  @State() discogContent: any = [];
  @State() queryResults: any = [];
  @State() artistId: number;

  // This will fire the getDiscogData mehtod onload...
  // componentWillLoad() {
  //   this.queryForImage();
  // }

  handleSubmit(e){
    e.preventDefault();
    this.getDiscogData(this.artistId);
    this.queryDiscogs(this.queryTerm);
  }

  handleChange(event) {
    // this.queryTerm = event.target.value;
    this.artistId = event.target.value;
  }

  handleQueryChange(event) {
    this.queryTerm = event.target.value;
    this.artistId = event.target.value;
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
        this.queryResults = response;
        // console.log(queryResults)
      });
  }

  render() {
    return (
      <div padding>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <label htmlFor="artist-id">Artist ID:</label>
          <input value={this.artistId} onInput={(event) => this.handleChange(event)}/>
          {/*<label htmlFor="query-term">Artist ID:</label>*/}
          {/*<input value={this.queryTerm} onInput={(event) => this.handleQueryChange(event)}/>*/}
        </form>
        <div>
        <h1 class="header-copy">{this.discogContent.name}</h1>
        </div>
        <div class="bio-content">
          <p class="body-copy">{this.discogContent.profile}</p>
          </div>
      </div>
    );
  }
}


import { Component, OnInit } from '@angular/core';
import { getDownloadURL, ref, Storage } from '@angular/fire/storage';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent implements OnInit {
  public imageURL!: string;

  constructor(private storage: Storage) {}

  ngOnInit() {
    this.uploadFile();
  }

  async uploadFile(): Promise<string> {
    const path = 'images/map.png';
    try {
      const storageRef = ref(this.storage, path);

      this.imageURL = await getDownloadURL(storageRef);
    } catch (e: any) {
      console.error(e);
    }
    return Promise.resolve(this.imageURL);
  }
}

import { Component, OnInit } from '@angular/core';
import { AngularAgoraRtcService, Stream } from 'angular-agora-rtc'; // Add

@Component({
  selector: 'app-video-stream',
  templateUrl: './video-stream.component.html',
  styleUrls: ['./video-stream.component.css']
})
export class VideoStreamComponent implements OnInit {
  localStream: Stream;

  ngOnInit() {
  }

  constructor(public agoraService: AngularAgoraRtcService) {
    this.agoraService.createClient();
  }

  public startCall() {
    //I'm going to change the '1000' to the actual game number that correlates!
    this.agoraService.client.join(null, '1000', null, (uid) => {
      this.localStream = this.agoraService.createStream(uid, true, null, null, true, false);
      this.localStream.setVideoProfile('720p_3');
      this.subscribeToStreams();
    }, function(err) {
      console.error("You arent high enough level noob! ", err)
    });
  }

  public subscribeToStreams() {
    this.localStream.on("accessAllowed", () => {
      console.log("accessAllowed");
    });
    //The user has denied access to the camera and mic :(
      this.localStream.on("accessDenied", () => {
        console.log("accessDenied");
      });

      // we in this bitch
      this.localStream.init(() => {
        console.log("getUserMedia successful");
        this.localStream.play('agora_local');
        this.agoraService.client.publish(this.localStream, function (err) {
          console.log("Publish local stream error: "+ err);
        });
        this.agoraService.client.on('stream_published', function (evt) {
          console.log("Publish to the stream successful");
        });
      }, function (err) {
        console.log("getUserMedia failed", err);
      });
  }
}

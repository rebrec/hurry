import { observable, computed, action } from "mobx"

class Timer {
  @observable start = Date.now()
  @observable current = Date.now()

  @computed
  get elapsedTime() {
    return this.current - this.start + "milliseconds"
  }

  @action
  tick() {
    this.current = Date.now()
  }
}

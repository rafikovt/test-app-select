import cloneDeep from 'lodash/cloneDeep'

const mutationNames = ['setData', 'updateValues']

class UndoRedoHistory {
  store
  history = []
  currentIndex = -1
  undoDisabled = true
  redoDisabled = true

  clearHistory () {
    const first = this.history[0]
    this.history = [first]
    this.currentIndex = 0
  }

  checkForUndoRedoAbility () {
    this.undoDisabled = this.currentIndex <= 0
    this.redoDisabled = this.currentIndex >= this.history.length - 1
  }

  init (store) {
    this.store = store
  }

  addState (state) {
    if (this.currentIndex + 1 < this.history.length) {
      this.history.splice(this.currentIndex + 1)
    }
    this.history.push(state)
    this.currentIndex++
    this.checkForUndoRedoAbility()
  }

  undo () {
    const prevState = this.history[this.currentIndex - 1]
    if (prevState) {
      this.store.replaceState(cloneDeep(prevState))
      this.currentIndex--
      this.checkForUndoRedoAbility()
    }
  }

  redo () {
    const nextState = this.history[this.currentIndex + 1]
    if (nextState) {
      this.store.replaceState(cloneDeep(nextState))
      this.currentIndex++
      this.checkForUndoRedoAbility()
      this.trips++
    }
  }
}

const undoRedoHistory = new UndoRedoHistory()

const undoRedoPlugin = (store) => {
  undoRedoHistory.init(store)

  store.subscribe((mutation, state) => {
    if (mutationNames.includes(mutation.type)) {
      undoRedoHistory.addState(cloneDeep(state))
    }
  })
}

export { undoRedoHistory, undoRedoPlugin }

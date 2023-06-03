class StateMachine {
  public states: Record<string, Record<string, any>> = {};
  public current: Record<string, State> = {};
  constructor() {}

  public create(...entries: any[]): State[] {
    const created = [];
    let names = [];

    for (const entry of entries) {
      if (typeof entry === "string") {
        names.push(entry);

        continue;
      }

      if (names.length > 0) {
        created.push(
          ...names.map(name => {
            const state = new entry(name);
            if (this.states[state.machine] == null) {
              this.states[state.machine] = {};
            }
            this.states[state.machine][state.name] = state;
            return state;
          })
        );
        names = [];
        continue;
      }
      const state = new entry();
      if (this.states[state.machine] == null) {
        this.states[state.machine] = {};
      }
      this.states[state.machine][state.name] = state;
      created.push(state);
    }

    return created;
  }

  set(state: string | State, machine = "default", ...params: any[]): void | Promise<void> {
    const next = typeof state === "string" ? GameState.states[machine][state] : state;

    let leaving: any;
    let entering: any;

    if (this.current[machine] != null) {
      leaving = this.current[machine].exit(next, ...params);
    }
    if (leaving instanceof Promise) {
      return leaving.then(() => {
        if (next != null) {
          entering = next.enter(this.current[machine], ...params);
        }
        if (entering instanceof Promise) {
          return entering.then(() => {
            this.current[machine] = next;
          });
        }
        this.current[machine] = next;
      });
    }

    if (next != null) {
      entering = next.enter(this.current[machine], ...params);
    }
    if (entering instanceof Promise) {
      return entering.then(() => {
        this.current[machine] = next;
      });
    }
    this.current[machine] = next;
  }

  get(machine = "default"): { state: State } {
    return { state: this.current[machine] };
  }
}
export const GameState = new StateMachine();

export class State {
  public constructor(public name: string, public machine = "default") {}
  public enter(_previous: State, ...params: any): void {}
  public exit(_next: State, ...params: any): void {}
}

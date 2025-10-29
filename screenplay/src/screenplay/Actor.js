export class Actor {
  constructor(name) {
    this.name = name;
    this.abilities = new Map();
  }

  whoCan(ability) {
    this.abilities.set(ability.constructor.name, ability);
    return this;
  }

  abilityTo(AbilityClass) {
    const ability = this.abilities.get(AbilityClass.name);
    if (!ability) throw new Error(`${this.name} does not have ability ${AbilityClass.name}`);
    return ability;
  }

  attemptsTo(...interactions) {
    return interactions.reduce((prev, interaction) => prev.then(() => interaction.performAs(this)), Promise.resolve());
  }

  asks(question) {
    return question.answeredBy(this);
  }
}

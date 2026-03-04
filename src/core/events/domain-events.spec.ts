import { AggregateRoot } from '../entities/aggregate-root'
import { UniqueEntityID } from '../entities/unique-entity-id'
import { DomainEvent } from './domain-event'
import { DomainEvents } from './domain-events'

class CustomAgregateCreated implements DomainEvent {
  public ocurredAt: Date
  private aggregate: CustomAgregate // eslint-disable-line
  constructor(aggregate: CustomAgregate) {
    this.aggregate = aggregate
    this.ocurredAt = new Date()
  }

  public getAggregateId(): UniqueEntityID {
    return this.aggregate.id
  }
}

class CustomAgregate extends AggregateRoot<unknown> {
  static create() {
    const aggregate = new CustomAgregate(null)
    aggregate.addDomainEvent(new CustomAgregateCreated(aggregate))
    return aggregate
  }
}

describe('domain events', () => {
  it('should be able to dispach and listen to events', () => {
    const callbackSpy = vi.fn()

    DomainEvents.register(callbackSpy, CustomAgregateCreated.name)

    const aggregate = CustomAgregate.create()
    expect(aggregate.domainEvents).toHaveLength(1)
    DomainEvents.dispatchEventsForAggregate(aggregate.id)
    expect(callbackSpy).toHaveBeenCalled()
    expect(aggregate.domainEvents).toHaveLength(0)
  })
})

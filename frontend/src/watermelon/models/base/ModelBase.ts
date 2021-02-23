import { Model } from '@nozbe/watermelondb'
import { action } from '@nozbe/watermelondb/decorators'

export class ModelBase extends Model {
  @action async deleteRecord() {
    await super.markAsDeleted()
  }
}

import { ApiProperty } from '@nestjs/swagger';

export class CreateActorDto {
  @ApiProperty({
    description: 'first name of the actor',
    example: 'Will',
  })
  readonly first_name: string;
  @ApiProperty({ example: 'Smith' })
  readonly last_name: string;
}

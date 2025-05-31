import { OmitType } from '@nestjs/mapped-types';
import { BaseUserDto } from './base-user.dto';

export class ReturnUserDto extends OmitType(BaseUserDto, ['password']) {}

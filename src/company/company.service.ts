import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Not, Repository } from 'typeorm';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company) private companyRepo: Repository<Company>,
  ) {}
  async create(createCompanyDto: CreateCompanyDto) {
    try {
      if (!createCompanyDto.is_active)
        return 'Status cannot be false for create';

      if (!createCompanyDto.company_name) return 'Company name cannot be empty';

      const existingCompany = await this.companyRepo.findOneBy({
        company_name: createCompanyDto.company_name,
      });

      if (existingCompany) return 'Company already exists';

      const company = await this.companyRepo.create(createCompanyDto);
      const result = await this.companyRepo.save(company);

      if (!result) return 'Failed to create company';

      return 'Company created successfully';
    } catch (error) {
      return `Failed to create company: ${error}`;
    }
  }

  async findAll(params: any) {
    try {
      const query = this.companyRepo.createQueryBuilder('company');

      const where = {};

      const allowedFilters = [
        'company_name',
        'email',
        'phone',
        'industry',
        'is_active',
      ];

      for (const key of allowedFilters) {
        const value = params[key];

        if (value !== undefined && value !== '') {
          // query.andWhere(`company.${key.trim()} = :${key.trim()}`, {
          //   [key]: value,
          // });
          where[key] = typeof value === 'string' ? value.trim() : value;
        }
      }

      // return query.getMany();
      return this.companyRepo.find({ where });
    } catch (error) {
      return `Failed to fetch companies: ${error}`;
    }
  }

  async findOne(id: number) {
    try {
      const company = await this.companyRepo.findOne({ where: { id } });

      if (!company) return 'Company does not exist';
      return company;
    } catch (error) {
      return `Failed to fetch company: ${error}`;
    }
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    try {
      const company = await this.companyRepo.findOne({ where: { id } });

      if (!company) {
        return 'Company does not exist';
      }

      if (updateCompanyDto.company_name) {
        const existingName = await this.companyRepo.findOne({
          where: {
            id: Not(id),
            company_name: updateCompanyDto.company_name.trim(),
          },
        });

        if (existingName) {
          return 'Company name already exists';
        }
      }

      if (updateCompanyDto.email) {
        const existingEmail = await this.companyRepo.findOne({
          where: {
            id: Not(id),
            email: updateCompanyDto.email.trim(),
          },
        });

        if (existingEmail) {
          return 'Email already exists';
        }
      }

      await this.companyRepo.update(id, {
        ...updateCompanyDto,
        ...(updateCompanyDto.company_name && {
          company_name: updateCompanyDto.company_name,
        }),
        ...(updateCompanyDto.email && {
          email: updateCompanyDto.email,
        }),
      });

      const updatedCompany = await this.companyRepo.findOne({
        where: { id },
      });

      return {
        message: 'Company updated successfully',
        data: updatedCompany,
      };
    } catch (error) {
      return `Failed to update company: ${error}`;
    }
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}

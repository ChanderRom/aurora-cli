/* eslint-disable indent */
/* eslint-disable key-spacing */
import { AuditingSideEffectEvent, SequelizeAuditingAgent } from '@aurorajs.dev/core';
import { AfterBulkCreate, AfterBulkDestroy, AfterBulkRestore, AfterBulkUpdate, AfterCreate, AfterDestroy, AfterRestore, AfterUpdate, AfterUpsert, Column, Model, Table, ForeignKey, BelongsTo, HasMany, BelongsToMany, HasOne } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { IamBoundedContextModel } from '@app/iam/bounded-context/infrastructure/sequelize/sequelize-bounded-context.model';
import { IamRoleModel } from '@app/iam/role/infrastructure/sequelize/sequelize-role.model';
import { IamPermissionsRolesModel } from '@app/iam/permission-role/infrastructure/sequelize/sequelize-permissions-roles.model';

@Table({
    modelName: 'IamPermission',
    freezeTableName: true,
    timestamps: false,
    indexes: [
        {
            fields: ['boundedContextId'],
            unique: false,
        },
    ],
})
export class IamPermissionModel extends Model<IamPermissionModel>
{
    @AfterCreate
    static auditingCreate(instance: IamPermissionModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.CREATED,
            '@app/iam/permission/infrastructure/sequelize/sequelize-permission.model',
            'IamPermissionModel',
        );
    }

    @AfterBulkCreate
    static auditingBulkCreate(instance: IamPermissionModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.BULK_CREATED,
            '@app/iam/permission/infrastructure/sequelize/sequelize-permission.model',
            'IamPermissionModel',
        );
    }

    @AfterUpdate
    static auditingUpdate(instance: IamPermissionModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.UPDATED,
            '@app/iam/permission/infrastructure/sequelize/sequelize-permission.model',
            'IamPermissionModel',
        );
    }

    @AfterBulkUpdate
    static auditingBulkUpdate(options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            null,
            options,
            AuditingSideEffectEvent.BULK_UPDATED,
            '@app/iam/permission/infrastructure/sequelize/sequelize-permission.model',
            'IamPermissionModel',
        );
    }

    @AfterDestroy
    static auditingDestroy(instance: IamPermissionModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.DELETED,
            '@app/iam/permission/infrastructure/sequelize/sequelize-permission.model',
            'IamPermissionModel',
        );
    }

    @AfterBulkDestroy
    static auditingBulkDestroy(options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            null,
            options,
            AuditingSideEffectEvent.BULK_DELETED,
            '@app/iam/permission/infrastructure/sequelize/sequelize-permission.model',
            'IamPermissionModel',
        );
    }

    @AfterRestore
    static auditingRestore(instance: IamPermissionModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.RESTORED,
            '@app/iam/permission/infrastructure/sequelize/sequelize-permission.model',
            'IamPermissionModel',
        );
    }

    @AfterBulkRestore
    static auditingBulkRestore(options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            null,
            options,
            AuditingSideEffectEvent.BULK_RESTORED,
            '@app/iam/permission/infrastructure/sequelize/sequelize-permission.model',
            'IamPermissionModel',
        );
    }

    @AfterUpsert
    static auditingUpsert(instance: IamPermissionModel, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.UPSERTED,
            '@app/iam/permission/infrastructure/sequelize/sequelize-permission.model',
            'IamPermissionModel',
        );
    }

    @Column({
        field: 'id',
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
    })
    id: string;

    @Column({
        field: 'name',
        allowNull: false,
        type: DataTypes.STRING(255),
    })
    name: string;

    @ForeignKey(() => IamBoundedContextModel)
    @Column({
        field: 'boundedContextId',
        allowNull: false,
        type: DataTypes.UUID,
    })
    boundedContextId: string;

    @BelongsTo(() => IamBoundedContextModel, {
        constraints: false,
        foreignKey: 'boundedContextId',
    })
    boundedContext: IamBoundedContextModel;


    @BelongsToMany(() => IamRoleModel, {
        through: () => IamPermissionsRolesModel,
        uniqueKey: 'Uq01IamPermissionsRoles',
    })
    roles: IamRoleModel[];

    @Column({
        field: 'createdAt',
        allowNull: true,
        type: DataTypes.DATE,
    })
    createdAt: string;

    @Column({
        field: 'updatedAt',
        allowNull: true,
        type: DataTypes.DATE,
    })
    updatedAt: string;

    @Column({
        field: 'deletedAt',
        allowNull: true,
        type: DataTypes.DATE,
    })
    deletedAt: string;

}
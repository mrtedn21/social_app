from django.db import migrations

sql_create = '''
    CREATE OR REPLACE FUNCTION person_name_annotation(
        first_name CHAR,
        last_name CHAR
    ) RETURNS CHAR IMMUTABLE LANGUAGE plpgsql AS
    $$
    BEGIN
        RETURN LOWER(
            CONCAT(
                first_name,
                CONCAT(last_name, first_name)
            )
        );
    END;
    $$;
    
    CREATE INDEX person_name_concat_idx ON person_person USING btree (person_name_annotation(first_name, last_name));
    '''


sql_drop = '''
    DROP INDEX person_name_concat_idx;
    DROP FUNCTION person_name_annotation;
    '''


class Migration(migrations.Migration):
    dependencies = [
        ('person', '0010_remove_person_friends'),
    ]

    operations = [
        migrations.RunSQL(
            sql=sql_create,
            reverse_sql=sql_drop,
        )
    ]

CREATE MATERIALIZED VIEW IF NOT EXISTS user_data_consumer TO user_data
AS SELECT * FROM user_data;
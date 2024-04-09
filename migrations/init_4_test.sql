CREATE TABLE IF NOT EXISTS "queue_exchange" (
  all String
) ENGINE = Kafka SETTINGS 
      kafka_broker_list = 'kafka:29092,192.168.0.43:9092',
      kafka_topic_list = 'prefix_.public.exchange_rates',
      kafka_group_name = 'exchange_rates',
      kafka_format = 'JSONAsString',
      kafka_skip_broken_messages = 10000,
      kafka_max_block_size = 1048576;


CREATE TABLE IF NOT EXISTS "exchange_data" (
    id String,
    created_at String,
    rate_amount String,
    target_currency_id UInt8,
    source_currency_id UInt8
) ENGINE = MergeTree()
ORDER BY created_at;

CREATE MATERIALIZED VIEW IF NOT EXISTS exchange_data_consumer TO exchange_data
AS SELECT 
  JSONExtractString(all, 'payload', 'after', 'id') AS id,
  JSONExtractString(all, 'payload', 'after', 'created_at') AS created_at,
  JSONExtractString(all, 'payload', 'after', 'rate_amount') AS rate_amount,
  JSONExtractUInt(all, 'payload', 'after', 'target_currency_id') AS target_currency_id,
  JSONExtractUInt(all, 'payload', 'after', 'source_currency_id') AS source_currency_id
FROM queue_exchange;
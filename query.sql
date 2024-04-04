SELECT
    count(*) AS total_rows,
    sum(CASE WHEN ban THEN 1 ELSE 0 END) AS total_banned_users,
    sum(CASE WHEN reg THEN 1 ELSE 0 END) AS total_registered_users,
    count(DISTINCT email) AS total_unique_emails,
    count(DISTINCT uuid) AS total_unique_uuids,
    max('dateReg') AS max_date_reg,
    max('dateFtd') AS max_date_of_first_deposit,
    sum(bets) AS total_bets,
    sum(wins) AS total_wins,
    sum(refunds) AS total_refunds,
    sum(rollbacks) AS total_rollbacks,
    sum(ggr) AS total_ggr
from "user_data";
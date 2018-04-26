# Realtime MySQL with Java, React, and Pusher

Using [mysql-binlog-connector-java
](https://github.com/shyiko/mysql-binlog-connector-java), a Java program listens for insert/update/delete statements on a MySQL database reading them from the replication log. These events are parsed and published on a [Pusher channel](https://pusher.com/docs/client_api_guide/client_channels) so a React web application can consume them and show them in realtime.  

Follow the tutorial here (to be published)

## Getting Started
1. Clone or download this repository: `git clone https://github.com/eh3rrera/realtime-mysql-pusher`.
2. Enable replication in the MySQL config file (usually `/etc/my.cnf` or `C:\ProgramData\MySQL\MySQL Server 5.7\my.ini`) adding the following section:
```
[mysqld]
server-id = 1
log_bin	 = /var/log/mysql/mysql-bin.log #Or c:/logs/mysql-bin.log
expire_logs_days = 10
max_binlog_size = 100M
binlog-format = row 
```
3. Make sure to give the necessary permissions to the directory where the logs are going to be stored.
4. Restart the MySQL server.
5. In the mysql client, execute the command `show master status;` to verify that the replication log is activated. Something like the following should be shown:
```
+------------------+----------+--------------+------------------+-------------------+
| File             | Position | Binlog_Do_DB | Binlog_Ignore_DB | Executed_Gtid_Set |
+------------------+----------+--------------+------------------+-------------------+
| mysql-bin.000001 |      001 |              |                  |                   |
+------------------+----------+--------------+------------------+-------------------+
```
6. Create the `products` table:
```
CREATE TABLE products(id int(11) not null auto_increment, name varchar(50) default null, price decimal(6,2), primary key (id));
```
7. Create a new MySQL user and give it replication permissions:
```
CREATE USER '<YOUR_USER>'@'<YOUR_HOST>' IDENTIFIED BY '<YOUR_PASSWORD>';
GRANT REPLICATION SLAVE, REPLICATION CLIENT ON *.* TO '<YOUR_USER>'@'<YOUR_HOST>';
GRANT ALL PRIVILEGES ON `<INSERT_YOUR_DB_NAME>`.* TO '<YOUR_USER>'@'<YOUR_HOST>';
FLUSH PRIVILEGES;
```
8. Go to [Pusher](https://pusher.com/), create a free account, and an app.
9. In `server/src/main/java/ReadLog.java` replace your database and Pusher information.
10. In `client/src/App.js` replace your Pusher information.
11. Inside the `client` directory, execute `npm install` to download the dependencies.
12. Start the development server with `npm start`. A browser window (http://localhost:3000/) will open.
13. In another terminal window, in the `server` directory, execute `mvn exec:java` to start the Java program.
14. Execute some DML statements to see how they are propagated to the React app:
```
INSERT INTO products(name, price) VALUES ('computer', 999.99);
INSERT INTO products(name, price) VALUES ('desk', 99.99);
UPDATE products SET price=100.01 WHERE id=1;
DELETE FROM products WHERE id=2;
```

### Prerequisites

You need to have installed:
- Java 8 or superior
- Maven 3.3 or superior
- MySQL 5.7 (5.6 and 5.5 should also work)
- Node.js 6 or superior

## Built With

* [Pusher](https://pusher.com/) - APIs to enable devs building realtime features
* [Maven](https://maven.apache.org/) - Dependency management for Java
* [MySQL](https://dev.mysql.com) - Relational database
* [create-react-app](https://github.com/facebook/create-react-app) - Create React apps with no build configuration

## Acknowledgments

* [Stanley Shyiko](https://github.com/shyiko) for [mysql-binlog-connector-java
](https://github.com/shyiko/mysql-binlog-connector-java)
* [Pusher](https://pusher.com/) for sponsoring the tutorial

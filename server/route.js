module.exports = (app) => {
  const { mysql_k1, mysql_k2, mysql_k3 } = require('./mysql.js')

  app.get('/create', function(req, res) {
    // console.log(req.params.p.date1)
    // res.send(mysql_run())
    mysql_k2.query("select * from (SELECT * FROM obs_energo ORDER BY id DESC limit 300) as t1 ORDER BY id asc", function(
      err,
      result
    ) {
      if (err) throw err
      // console.log(result[1]);
      res.send(result)
    })
  })

  app.get('/mixer_stat_year', function(req, res) {
    // console.log(req.params.p.date1)
    // res.send(mysql_run())
    sql = `SELECT  DATE_FORMAT(date_brutto,'%Y') as year, ROUND(SUM(netto)+COALESCE(SUM(netto_2),0),1)  as value
    FROM protocol_konv2.weight_m1_m2
    where date_brutto BETWEEN CURRENT_DATE() - INTERVAL 5 Year and  CURRENT_DATE()
    GROUP BY DATE_FORMAT(date_brutto,'%Y')`
    mysql_k2.getConnection(function(err, connection) {
      if (err) throw err; // not connected!
      // Use the connection
      connection.query(sql, function (error, result) {
        res.send(result)
        console.log(result)
        connection.release();
        if (error) throw error;
      });
    });
  })

  app.get('/mixer_stat_month', function(req, res) {
    // console.log(req.params.p.date1)
    // res.send(mysql_run())
    sql = `SELECT  DATE_FORMAT(date_brutto,'%m.%Y')  as month, ROUND(SUM(netto)+COALESCE(SUM(netto_2),0),1) as value
    FROM protocol_konv2.weight_m1_m2
    where date_brutto BETWEEN CURRENT_DATE() - INTERVAL 60 MONTH and  CURRENT_DATE()
    GROUP BY DATE_FORMAT(date_brutto,'%Y-%m')`
    mysql_k2.getConnection(function(err, connection) {
      if (err) throw err; // not connected!
      // Use the connection
      connection.query(sql, function (error, result) {
        res.send(result)
        console.log(result)
        connection.release();
        if (error) throw error;
      });
    });
  })

  app.get('/mixer_stat_day', function(req, res) {
    // console.log(req.params.p.date1)
    // res.send(mysql_run())
    sql = `SELECT  DATE_FORMAT(date_brutto,'%d.%m.%Y') as day_k2, ROUND(SUM(netto)+COALESCE(SUM(netto_2),0),1) as value_k2
          FROM protocol_konv2.weight_m1_m2
          where date_brutto BETWEEN CURRENT_DATE() - INTERVAL 30 DAY and  CURRENT_DATE()
          and Nplavki_manual >= 200000 and Nplavki_manual <= 299999
          GROUP BY DATE_FORMAT(date_brutto,'%Y-%m-%d')`
    mysql_k2.getConnection(function(err, connection) {
      if (err) throw err; // not connected!
      // Use the connection
      connection.query(sql, function (error, result) {
        res.send(result)
        console.log(result)
        connection.release();
        if (error) throw error;
      });
    });
  })

  app.get('/get_list_passports/:konv/:date', function(req, res) {
    console.log(req.params.konv)
    console.log(req.params.date)
    // res.send("ok");
    const sql = `SELECT  Nplavki ,DATE_FORMAT(begin_time ,  '%H:%i' )  AS  begin_time,
                  DATE_FORMAT(end_time ,'%H:%i' )  AS  end_time FROM  protokol_plavka
                  WHERE  begin_data LIKE '${req.params.date}' GROUP BY Nplavki ASC`
    // res.send(mysql_run())
    console.log(sql)

    query_by_konv(req.params.konv, sql, res)

  })

   app.get('/get_passport_tech_operation/:konv/:nplavki', function(req, res) {
      const sql = `SELECT t1.*, t2.o2 from
                  (SELECT oper , DATE_FORMAT(begin_date,'%d.%m.%Y %H:%i:%s') as begin_date , DATE_FORMAT(end_date,'%d.%m.%Y %H:%i:%s') as 'end_date' , SEC_TO_TIME(round(length*60)) as 'length'
                  FROM protocol_manipulation  WHERE length <> '0'  AND Nplavki = ${req.params.nplavki} ORDER BY end_date ASC) as t1
                  LEFT JOIN
                  (SELECT o2, Convert('Плавка' using 'cp1251') as 'oper'  FROM protokol_plavka where Nplavki = ${req.params.nplavki} and  oper='plavka'
                  UNION SELECT o2, Convert('Продувка' using 'cp1251')  as 'oper'  FROM protokol_plavka where Nplavki = ${req.params.nplavki} and  oper='prod' and o2 > 0
                  UNION SELECT o2, Convert('Додувка 1' using 'cp1251')  as 'oper'  FROM protokol_plavka where Nplavki = ${req.params.nplavki} and  oper='dodyv1'  and o2 > 0
                  UNION SELECT o2, Convert('Додувка 2' using 'cp1251') as 'oper' FROM protokol_plavka where Nplavki = ${req.params.nplavki} and  oper='dodyv2'  and o2 > 0
                  UNION SELECT o2, Convert('Додувка 3' using 'cp1251') as 'oper'  FROM protokol_plavka where Nplavki = ${req.params.nplavki} and  oper='dodyv3'  and o2 > 0
                  UNION SELECT o2, Convert('Раздувка' using 'cp1251') as 'oper'  FROM protokol_plavka where Nplavki = ${req.params.nplavki} and  oper='razd'  and o2 > 0
                  ) as t2
                  on t1.oper = t2.oper;`
      console.log(sql)
      query_by_konv(req.params.konv, sql, res)
    })

    app.get('/get_passport_sup/:konv/:nplavki', function(req, res) {
    const sql = `SELECT time, mater, ves, kyda FROM  protocol_sup WHERE Nplavki = ${req.params.nplavki} ORDER BY id ASC`
    console.log(sql)
    query_by_konv(req.params.konv, sql, res)
  })

    app.get('/get_passport_sup_total/:konv/:nplavki', function(req, res) {
    const sql = `SELECT mater , konv , kovsh FROM protokol_total_sup WHERE Nplavki = ${req.params.nplavki}`
    console.log(sql)
    query_by_konv(req.params.konv, sql, res)
  })

  app.get('/get_passport_ferr/:konv/:nplavki', function(req, res) {
    const sql = `SELECT time , mater , ves FROM protocol_ferr WHERE Nplavki = ${req.params.nplavki} ORDER BY id ASC`
    console.log(sql)
    query_by_konv(req.params.konv, sql, res)
  })

  app.get('/get_passport_ferr_total/:konv/:nplavki', function(req, res) {
    const sql = `SELECT  mater,kovsh FROM  protokol_total_ferr WHERE Nplavki = ${req.params.nplavki}`
    console.log(sql)
    query_by_konv(req.params.konv, sql, res)
  })

  app.get('/get_passport_vne_plavki/:konv/:nplavki', function(req, res) {
    const sql = `SELECT  time,mater,ves,kyda FROM  protokol_matr_nalevo WHERE Nplavki = ${req.params.nplavki}`
    console.log(sql)
    query_by_konv(req.params.konv, sql, res)
  })

  app.get('/get_passport_temp_povalka/1/:nplavki', function(req, res) {
    const sql = `SELECT time_zamer as time,temper as temperature ,testing FROM  protocol_temp_chugun WHERE Nplavki = ${req.params.nplavki}`
    console.log(sql)
    query_by_konv(1, sql, res)
  })

  app.get('/get_passport_temp_povalka/:konv/:nplavki', function(req, res) {
    const sql = `SELECT time,temperature, oxidation,testing FROM  celox WHERE Nplavki = ${req.params.nplavki}`
    console.log(sql)
    query_by_konv(req.params.konv, sql, res)
  })

  app.get('/get_passport_calc_temp/:konv/:nplavki', function(req, res) {
    const sql = `SELECT DATE_FORMAT(dt_create,'%H:%i:%s') As Time, DATE_FORMAT(dt_create,'%d.%m.%Y') As Date,TempBeginSlivMetal FROM protocol_calctemp Where Nplavki = ${req.params.nplavki}`
    console.log(sql)
    query_by_konv(req.params.konv, sql, res)
  })

  app.get('/get_passport_argon/:konv/:nplavki', function(req, res) {
    const sql = `SELECT Time,DATE_FORMAT(Date,'%d.%m.%Y') As Date,P_Ar_average,Length_open_Ar FROM argon Where n_plavki = ${req.params.nplavki}`
    console.log(sql)
    query_by_konv(req.params.konv, sql, res)
  })

  app.get('/get_passport_express_analiz/:konv/:nplavki', function(req, res) {
    const sql = `SELECT C , Mn , S , P, Cu, Cr, Ni, Al, Sn, Sb FROM protokol_eks_analiz WHERE Nplavki = ${req.params.nplavki} ORDER BY date_create ASC,time_create ASC`
    console.log(sql)
    query_by_konv(req.params.konv, sql, res)
  })

  function query_by_konv(num_konv, sql, res) {
    if (num_konv == 1) {
      mysql_k1.getConnection(function(err, connection) {
        if (err) throw err; // not connected!
        // Use the connection
        connection.query(sql, function (error, result) {
          res.send(result)
          console.log(result)
          connection.release();
          if (error) throw error;
        });
      });
    } else if (num_konv == 2) {
      mysql_k2.getConnection(function(err, connection) {
        if (err) throw err; // not connected!
        // Use the connection
        connection.query(sql, function (error, result) {
          res.send(result)
          console.log(result)
          connection.release();
          if (error) throw error;
        });
      });
    } else if (num_konv == 3) {
      mysql_k3.getConnection(function(err, connection) {
        if (err) throw err; // not connected!
        // Use the connection
        connection.query(sql, function (error, result) {
          res.send(result)
          console.log(result)
          connection.release();
          if (error) throw error;
        });
      });
    }
  }

}

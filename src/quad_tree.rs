pub struct QuadTree {
    nw: Option<Box<QuadTree>>,
    ne: Option<Box<QuadTree>>,
    sw: Option<Box<QuadTree>>,
    se: Option<Box<QuadTree>>,

    value: u32,
}

impl QuadTree {
    pub fn new(nw: Option<QuadTree>,
               ne: Option<QuadTree>,
               sw: Option<QuadTree>,
               se: Option<QuadTree>,
               value: u32) -> QuadTree {
        QuadTree {
            nw: Some(Box::new(nw.unwrap())),
            ne: Some(Box::new(ne.unwrap())),
            sw: Some(Box::new(sw.unwrap())),
            se: Some(Box::new(se.unwrap())),
            value: value,
        }
    }
}
